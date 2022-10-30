/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

interface PhoneBook {
    firstName: string;
    lastName: string;
    phone: number;
}

function PhoneBookForm({ addEntryToPhoneBook, onSubmit }) {
    const [firstName, setfirstName] = useState<string>(addEntryToPhoneBook.firstName)
    const [lastName, setlastName] = useState<string>(addEntryToPhoneBook.lastName)
    const [phone, setphone] = useState<number>(addEntryToPhoneBook.phone)
    const localSubmit = (e) => {
        e.preventDefault();
        let obj: PhoneBook = {
            firstName,
            lastName,
            phone
        }
        onSubmit(obj);
        reset();
    }
    const reset = () => {
        setfirstName("")
        setlastName("")
        setphone(0)
    }
    return (
        <form onSubmit={localSubmit} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                value={firstName}
                onChange={(event) => {
                    setfirstName(event.target.value)
                }}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                value={lastName}
                onChange={(event) => {
                    setlastName(event.target.value)
                }}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                value={phone}
                onChange={(event) => {
                    setphone(+event.target.value)
                }}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable({data}) {
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry: PhoneBook) => (
                    <tr>
                        <td>{entry.firstName}</td>
                        <td>{entry.lastName}</td>
                        <td>{entry.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Application(props) {
    const [data, setData] = useState<PhoneBook[]>([]);
    const initialData: PhoneBook = {
        firstName: 'Coder',
        lastName: 'Byte',
        phone: 8885559999
    }
    const onSubmit = (incomingData: PhoneBook) => {
        let temp: PhoneBook[] = JSON.parse(JSON.stringify(data))
        temp.push(incomingData)
        setData(temp);
    }
    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={initialData} onSubmit={onSubmit}/>
            <InformationTable data={data}/>
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);