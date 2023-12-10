const harperFetch = (body: { [k: string]: any }) => {
  if (!process.env.HARPER_DB_URL) {
    throw new Error('No HARPER_DB_URL environment variable found.')
  }
  return fetch(process.env.HARPER_DB_URL, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      database: 'list',
      table: 'collection',
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + process.env.HARPER_AUTH_TOKEN,
    },
  })
}

export const insert = async (records: any[] = []) => {
  const t = await harperFetch({
    records,
    operation: 'insert',
  })
  if (!t.ok) return {}
  return await t.json()
}

export const update = async (records = []) => {
  await harperFetch({
    records,
    operation: 'update',
  })
}

export const deleteRecords = async (ids = []) => {
  await harperFetch({
    ids,
    operation: 'delete',
  })
}

export const searchByValue = async (search_value: string, search_attribute: string = 'id', get_attributes: string[] = ['*']) => {
  const t = await harperFetch({
    search_value,
    get_attributes,
    search_attribute,
    operation: 'search_by_value',
  })
  if (!t.ok) return []
  return await t.json()
}

export const searchByConditions = async (conditions: any[] = [], get_attributes: string[] = ['*']) => {
  const t = await harperFetch({
    conditions,
    get_attributes,
    operator: 'or',
    operation: 'search_by_conditions',
  })
  if (!t.ok) return []
  return await t.json()
}
