import { useEffect, useState, useRef } from "react";
const ENDPOINT = 'http://localhost:4000/users';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const dialogRef = useRef(null);
    const [currentUser, setCurrentUser] = useState({
        id: 0,
        email: "",
        name: "",
        pass: ""
    });

    const getAll = async () => {
        let fetchResp = await fetch(ENDPOINT);
        let dataJson = await fetchResp.json();
        setUsers(dataJson);
    }

    useEffect(() => {
        (async () => {
            await getAll();
        })();
    }, []);

    const newUserClick = (e) => {
        e.preventDefault();
        dialogRef.current.showModal();
    }

    const closeNewUserModal = (e) => {
        e.preventDefault();
        dialogRef.current.close();
    } 

    const valueHasChanged = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.pass]: e.target.value
        });
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        let fetchResp = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentUser)
        })
        let json = await fetchResp.json();
        console.log(json);
        await getAll();
        dialogRef.current.close();
    }

    return(
        <>
            <dialog ref={dialogRef}>
                <h4>Nuevo Usuario</h4>
                <form onSubmit={formSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" 
                            id="name"
                            name="name"
                            value={currentUser.name}
                            onChange={valueHasChanged} />
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                            id="email"
                            name="email"
                            value={currentUser.email}
                            onChange={valueHasChanged} />
                    <label htmlFor="pass">Password</label>
                    <input type="password" 
                            id="pass"
                            name="pass"
                            value={currentUser.pass}
                            onChange={valueHasChanged} />
                    <button type="submit" id="btnAddUser">Guardar</button>
                </form>

                <button onClick={closeNewUserModal}>Cerrar</button>
            </dialog>
            <button onClick={newUserClick}>Agregar Nuevo Usuario</button>

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