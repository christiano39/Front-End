import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialFormValues = {
    name: '',
    description: '',
    steps: '',
    category: '',
    complexity: ''
}

const Creator = () => {
    const [howTos, setHowTos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formOpen, setFormOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const onInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
        setDisabled(checkForRequiredFields());
    }

    const checkForRequiredFields = () => {
        const { name, description, steps, category } = formValues;
        if (name !== '' && description !== '' && steps !== '' && category !== '') {
            setError('');
            return false;
        }else {
            setError('Please fill out all required fields');
            return true;
        }
    }

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        setFormValues(initialFormValues);
    }

    const addHowTo = e => {
        e.preventDefault();
        console.log(formValues);
    }

    useEffect(() => {
        
    }, []);
    
    return (
        <section id='creator-dashboard'>
            <div className='form-container'>
                {!formOpen && <button onClick={openForm}>Add New How-To</button>}
                {formOpen && <form onSubmit={addHowTo}>
                    <label htmlFor='name'>Title*:&nbsp;</label>
                    <input 
                        type='text'
                        id='name'
                        name='name'
                        value={formValues.name}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='description'>Description*:&nbsp;</label>
                    <input 
                        type='text'
                        id='description'
                        name='description'
                        value={formValues.description}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='steps'>Steps*:&nbsp;</label>
                    <textarea 
                        id='steps'
                        name='steps'
                        value={formValues.steps}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='category'>Category*:&nbsp;</label>
                    <input 
                        type='text'
                        id='category'
                        name='category'
                        value={formValues.category}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='complexity'>Time to complete:&nbsp;</label>
                    <input 
                        type='text'
                        id='complexity'
                        name='complexity'
                        value={formValues.complexity}
                        onChange={onInputChange}
                    /><br/><br/>
                    <button disabled={disabled}>Create How-To</button>&nbsp;
                    <button onClick={closeForm}>Cancel</button>
                    {error && <p className='error'>{error}</p>}
                </form>}


            </div>
        </section>
    )
}

export default Creator;