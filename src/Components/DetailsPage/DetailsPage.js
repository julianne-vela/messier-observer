import React, { Component } from 'react';
import './DetailsPage.css';
// import Form from '../Common/Form.js';
import {
    getMessierObject,
    getTypes,
    updateMessierObject,
    getTypeId,
} from '../Common/Utils/api-utils.js';

export default class DetailsPage extends Component {
    state = {
        object_types: [],
        messier_id: '',
        ngc_ic_num: '',
        common_name: '',
        image: '',
        type_id: 1,
        distance_from_earth_kly: 0,
        constellation: '',
        apparent_mag: 0,
        right_asc: '',
        declination: '',
        observation_completed: false,
    }

    componentDidMount = async () => {
        const object_types = await getTypes();

        const messierObject = await getMessierObject(this.props.match.params.messier_id);

        console.log(messierObject);

        const type_id = getTypeId(messierObject, object_types);

        this.setState({
            type_id,
            object_types,
        })
    } 

    handleIdChange = (e) => this.setState({messier_id: e.target.value})
    handleNGCChange = (e) => this.setState({ngc_ic_num: e.target.value})
    handleCNameChange = (e) => this.setState({common_name: e.target.value})
    handleImageChange = (e) => this.setState({image: e.target.value})
    handleDistanceChange = (e) => this.setState({distance_from_earth_kly: Number(e.target.value)})
    handleConsteChange = (e) => this.setState({constellation: e.target.value})
    handleMagChange = (e) => this.setState({apparent_mag: Number(e.target.value)})
    handleRAChange = (e) => this.setState({right_asc: e.target.value})
    handleDecChange = (e) => this.setState({declination: e.target.value})
    handleObserveChange = (e) => this.setState({observation_completed: !this.state.observation_completed})
    handleTypeChange = (e) => this.setState({type_id: Number(e.target.value)})

    handleSubmit = async (e) => {
        e.preventDefault();
        
        await updateMessierObject(this.props.match.messier_id, this.state);

        this.props.history.push('/messier_catalog');
    }
        render() {
            console.log(this.messierObject);

            console.log(getMessierObject('M9'));
            const {
                messier_id,
                ngc_ic_num,
                common_name,
                image,
                type_id,
                distance_from_earth_kly,
                constellation,
                apparent_mag,
                right_asc,
                declination,
                observation_completed,
            } = this.state;

        return (
            <main className='detailsPage'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Messier Number
                        <input value={messier_id} onChange={this.handleIdChange}/>
                    </label>
                    <label>
                        New General Catalogue ID
                        <input value={ngc_ic_num} onChange={this.handleNGCChange}/>
                    </label>
                    <label>
                        Image URL: 
                        <input value={image} onChange={this.handleImageChange}/>
                    </label>
                    <label>
                        <input value={common_name} onChange={this.handleCNameChange}/>
                    </label>
                    <label>
                        Object Type: 
                        <select value={type_id} onChange={this.handleTypeChange}>
                            <option value='1'>Globular Cluster</option>
                            <option value='2'>Nebula with Cluster</option>
                            <option value='3'>Open Cluster</option>
                            <option value='4'>Supernova Remnant</option>
                        </select>
                    </label>
                    <label>
                        Distance from Earth (kly): 
                        <input value={distance_from_earth_kly} onChange={this.handleDistanceChange}/>
                    </label>
                    <label>
                        Constellation: 
                        <input value={constellation} onChange={this.handleConsteChange}/>
                    </label>
                    <label>
                        Apparent Magnitude: 
                        <input value={apparent_mag} onChange={this.handleMagChange}/>
                    </label>
                    <label>
                        RA: 
                        <input value={right_asc} onChange={this.handleRAChange}/>
                    </label>
                    <label>
                        Declination: 
                        <input value={declination} onChange={this.handleDecChange}/>
                    </label>
                    <label>
                        <input type='checkbox' value={observation_completed} onChange={this.handleObserveChange}/>
                    </label>
                    <button value='submit'>Change</button>
                </form>

                {/* <Form /> */}
            </main>
        )
    }
}