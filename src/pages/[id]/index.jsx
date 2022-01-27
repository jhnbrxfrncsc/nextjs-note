import { useState, useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// fetch
import fetch from 'isomorphic-unfetch';

// semantic-ui react
import {
    Button,
    Confirm,
    Loader
} from 'semantic-ui-react';

const NotePage = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // router
    const router = useRouter();

    // useEffect
    useEffect(() => {
        if(isDeleting){
            deleteNote();
        }
    }, [isDeleting])

    // event handlers
    const openModal = () => setConfirm(true);
    const closeModal = () => setConfirm(false);

    const deleteNote = async() => {
        const noteId = router.query.id;

        try {
            const res = await fetch(`http://localhost:3000/api/notes/${noteId}`,{
                method: "DELETE"
            });
            const deletedNote = await res.json();
            console.log(deletedNote);
            // router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async() => {
        setIsDeleting(true);
        closeModal();
    }


    return (
        <div className='note-container'>
            {
                isDeleting ? (
                    <Loader active />
                ) : (
                    <>
                        <h1>{note.title}</h1>
                        <p>{note.desc}</p>
                        <Button 
                            color="red"
                            onClick={openModal}
                        >
                            Delete
                        </Button>
                    </>
                )
            }
            <Confirm 
                open={confirm}
                onCancel={closeModal}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${params.id}`);
    const { data } = await res.json();

    return {
        props: {
            note: data
        }
    }
}

export default NotePage;
