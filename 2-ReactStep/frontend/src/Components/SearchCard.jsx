import React from 'react'

const SearchCard = (props) => {
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
                                                return <a href="/#" key={filter.property} className="dropdown-item">{filter.label}</a>
                                            })}
                                        </div>
                                    </div>
                                    <input type="hidden" name="search_param" value="all" id="search_param"/>
                                    <input type="text" className="form-control" name="x" placeholder="Pesquisar por título" id="search_value"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-secondary" type="button" id="btnSearch"><span
                                                className="icon-android-search"></span></button>
                                        <button className="btn btn-success ml-1" type="button" id="btnAdd"><span
                                                className="icon-android-add"></span></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body collapse in">
                        <div id="divLoading">

                        </div>
                        <div className="table-responsive" id="table">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
