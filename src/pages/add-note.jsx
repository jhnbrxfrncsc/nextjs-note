import { useState, useEffect } from 'react';

// next
import { useRouter } from 'next/router';
import Link from 'next/link';

// fetch
import fetch from 'isomorphic-unfetch';

// semantic-ui react
import {
    Button,
    Form,
    Loader
} from 'semantic-ui-react';

const CreateNote = () => {
    const [formData, setFormData] = useState({
        title: "",
        desc: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // router
    const router = useRouter();

    useEffect(() => {
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                createNote();
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    // event handlers
    const validate = () => {
        let err = {};

        if(formData.title.length < 40 && formData.title.length === 0){
            err.title = 'Title is required';
        } 
        
        if(formData.desc.length < 200 && formData.desc.length === 0){
            err.desc = 'Description is required';
        }

        return err;
    }

    const createNote = async() => {
        console.log("createNote()");
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const newNote = await res.json();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs); 
        setIsSubmitting(true);
    } 

    return (
        <div className='form-container'>
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting ? (
                        <Loader active inline="centered" />
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Input 
                                fluid={true}
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label="Title"
                                placeholder="Enter the title"
                                name="title"
                                onChange={handleChange}
                            />
                            <Form.TextArea 
                                fluid={true}
                                error={errors.desc ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label="Description"
                                placeholder="Enter the description"
                                name="desc"
                                onChange={handleChange}
                            />

                            <Button color="teal" type="submit">
                                Submit
                            </Button>
                        </Form>
                    )
                }
            </div>
        </div>
    )
}

export default CreateNote;
