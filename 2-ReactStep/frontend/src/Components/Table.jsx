import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Table.module.css'

const Table = ({headers, data, entity}) => {
    return (
        <div className="table-responsive">
            <table className="table" table-hover table-bordered>
                <thead className="thead-inverse">
                    <tr>
                        <th scope="col" className={styles.center}>Código</th>
                        {headers.map((item)=>{
                               return <th key={item} scope="col">{item}</th>
                        })}
                        <th scope="col" className={styles.center}>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item)=>{
                    return <tr key={item[0].id}>
                            <td className={`${styles.center} ${styles.smallColumn}`}>{item[0].id}</td>
                            {item.slice(1).map((key, index)=>{
                                return <td key={index}>{key[Object.keys(key)]}</td>
                            })}
                            <td className={`${styles.center} ${styles.smallColumn}`}>
                                <Link class='btn btn-secondary btn-sm' to={`${entity}/Details/${item[0].id}`}>
                                    <i class='icon-eye'></i>
                                </Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
