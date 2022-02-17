import React from 'react'
import { Link } from 'react-router-dom';
import Input from './Forms/Input'
import Table from './Table'

type propsTypes = {
    headers: Array<string>,
    filters: Array<{
        label: string,
        property: string
    }>,
    data: Array<any>,
    entity: string
}

const SearchCard = (props: propsTypes) => {
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState(props.filters[0]);
    const [data, setData] = React.useState(props.data); //idk why this state dont get the initial value

    function Search(){
        setData(props.data.filter(el => el[filter.property].toLowerCase().indexOf(search.toLowerCase()) > -1))
    }

    function handleKeyDown({key}: React.KeyboardEvent<HTMLInputElement>){
        if(key === 'Enter')
            Search();
    }

    return (
        <div className="row">
            <div className="col-xs-12">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-9 mb-0">
                                <div className="input-group">
                                    <div className="input-group-btn search-panel">
                                        <button type="button" className="btn btn-secondary dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Filtro</button>
                                        <div className="dropdown-menu">
                                            {props.filters.map((filter)=>{
                                                return <button type="button" style={{cursor:"pointer"}} onClick={()=>setFilter(filter)} key={filter.property} className="dropdown-item">{filter.label}</button>
                                            })}
                                        </div>
                                    </div>
                                    <Input type="text" className="form-control" onKeyDown={handleKeyDown} placeholder={`Pesquisar por ${filter.label}`} value={search} setValue={setSearch}/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-secondary" type="button" onClick={Search}><span
                                                className="icon-android-search"></span></button>
                                        <Link to={`/${props.entity}/Create`}><button className="btn btn-success ml-1" type="button"><span
                                                className="icon-android-add"></span></button></Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body collapse in">
                        <div id="divLoading">

                        </div>
                        <Table
                            headers={props.headers}
                            data={data}
                            entity={props.entity}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
