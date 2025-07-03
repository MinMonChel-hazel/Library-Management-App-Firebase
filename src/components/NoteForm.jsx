import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function NoteForm({type = 'create', setEditNote, editNote}) {

    let { id } = useParams();

    let [body, setBody] = useState('');

    useEffect(() => {
        if (type === 'update') {
            setBody(editNote.body)
        }
    },[type])

    let {addCollection, updateDocument} = useFirestore();

    let submit = async (e) => {
        e.preventDefault();
        if (type === 'create') {
            let data = {
                body,
                bookUid : id
            }
            await addCollection('notes', data)
        } else {
            editNote.body = body;
            await updateDocument('notes', editNote.id, editNote, false)
            setEditNote(null);
        }

        setBody('');
    }

    return (
        <form onSubmit={submit}>
            <textarea value={body} onChange={e => setBody(e.target.value)} className='bg-gray-50 shadow-lg border-2 outline-none w-full p-2 rounded-md' name="" id="" rows='4'></textarea>
            <div className='flex space-x-3'>
                <button type='submit' className='text-white bg-primary px-3 py-2 rounded-lg text-sm flex items-center gap-1'>
                    <span>{type === 'create' ? 'Add' : 'Update'} Note</span>
                </button>
                {type === 'update' && <button onClick={() => setEditNote(null)} type='button' className='text-primary border-2 border-primary px-3 py-2 rounded-lg text-sm flex items-center gap-1'>
                    Cancel
                </button>}
            </div>
        </form>
    )
}
