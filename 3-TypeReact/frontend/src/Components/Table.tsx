import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Table.module.css'

type propsTypes = {
    headers: Array<string>,
    data: Array<any>,
    entity: string
}

const Table = ({headers, data, entity}:propsTypes) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
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
                    return <tr key={item.id}>
                            <td className={`${styles.center} ${styles.smallColumn}`}>{item.id}</td>
                            {Object.keys(item).slice(1).map((key, index) =>{
                                return <td key={index}>{item[key]}</td>
                            })}
                            <td className={`${styles.center} ${styles.smallColumn}`}>
                                <Link className='btn btn-secondary btn-sm' to={`/${entity}/Details/${item.id}`}>
                                    <i className='icon-eye'></i>
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
