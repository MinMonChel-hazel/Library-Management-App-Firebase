import React, { useState } from 'react'
import useFirestore from '../hooks/useFirestore'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import trash from '../assets/trash.svg';
import pencil from '../assets/pencil.svg';
import NoteForm from './NoteForm';
import useTheme from '../hooks/useTheme';

export default function NoteList() {

    let { id } = useParams();

    let {getCollection, deleteDocument} = useFirestore();

    let {error, data : notes, loading} = getCollection('notes', ['bookUid', '==', id])

    let [editNote, setEditNote] = useState(null);

    let { isDark, changeTheme } = useTheme();

    let deleteNote = async (id) => {
        await deleteDocument('notes', id)
    }

    return (
        !!notes.length && (
            notes.map(note => (
                <div key={note.id} className='border-2 shadow-md p-3 my-5'>
                    <div className='flex justify-between'> 
                        <div>
                            <img className='rounded-full' src="https://down-th.img.susercontent.com/file/th-11134226-7r98o-lpgniwjl2zr249_tn" alt="" />
                            <div>
                                <h3 className={`${isDark ? 'text-white' : ''}`}>Min Mon Chel</h3>
                                <p className='text-gray-400'>{moment(note?.date?.seconds * 1000).fromNow()}</p>
                            </div>
                        </div>
                        <div>
                            <img className='cursor-pointer' src={pencil} alt="" onClick={() => setEditNote(note)} />
                            <img className='cursor-pointer' src={trash} alt="" onClick={() => deleteNote(note.id)} />
                        </div>
                    </div>
                    
                    <div className={`mt-3 ${isDark ? 'text-primary' : ''}`}>
                        {editNote?.id !== note.id && note.body}
                        {editNote?.id === note.id && <NoteForm type = 'update' setEditNote={setEditNote} editNote={editNote}/>}
                    </div>
                </div>
            ))
        )
    )
}
