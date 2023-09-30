import { useEffect, useState } from "react";

export const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        (async () => {
            let fetchResp = await fetch('http://localhost:4000/users');
            let dataJson = await fetchResp.json();
            setUsers(dataJson);
        })();
    }, []);

    return(
        <>
            <h1>Users</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(row=>(
                        <tr key={"user" + row.id}>
                            <td>{row.id}</td>
                            <td>{row.email}</td>
                            <td>{row.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}