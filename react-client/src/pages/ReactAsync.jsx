import { useAsync } from "react-async"
import connection from "../database/db";

// You can use async/await or any function that returns a Promise
const loadPlayer2 = async () => {
  const res = await connection.get("view/income")
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

const MyComponent2 = () => {
  const { data, error, isPending } = useAsync({ promiseFn: loadPlayer2})
  if (isPending) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (data)
    return (
      <div>
        <strong>Player data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  return null
}

export default MyComponent2