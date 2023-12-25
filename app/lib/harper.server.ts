// Function to make requests to HarperDB
const harperFetch = (body: { [k: string]: any }) => {
  // Check if HARPER_DB_URL environment variable is set
  if (!process.env.HARPER_DB_URL) {
    throw new Error('No HARPER_DB_URL environment variable found.')
  }
  // Make a POST request to HarperDB
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

// Function to insert records into the database
export const insert = async (records: any[] = []) => {
  const t = await harperFetch({
    records,
    operation: 'insert',
  })
  if (!t.ok) return {}
  return await t.json()
}

// Function to update records in the database
export const update = async (records = []) => {
  await harperFetch({
    records,
    operation: 'update',
  })
}

// Function to delete records from the database
export const deleteRecords = async (ids = []) => {
  await harperFetch({
    ids,
    operation: 'delete',
  })
}

// Function to search for records by a specific value
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

// Function to search for records based on conditions
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
