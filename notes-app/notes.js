
const fs=require('fs')
const chalk=require('chalk')
const { argv } = require('process')


const addNote=(title,body) => {
     const notes=loadNotes()
    // const duplicateNotes=notes.filter((note) =>note.title===title)
     const duplicateNote =notes.find((note) => note.title===title)
     //--if u dont find the match find() method returns undefined
     if(!duplicateNote)
     {
        notes.push
        ({
              title:title,
              body:body
        })
        saveNotes(notes)
        console.log('New Note Added!')
       //    console.log(notes)
     }else{
         console.log('Note title Taken!!')
     }
}

const saveNotes=(notes) => {
    const dataJson=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes=() => {
    try{
        const dataBuff=fs.readFileSync('notes.json')
    const dataJSON=dataBuff.toString()
    return JSON.parse(dataJSON)

    }catch(e){
        return []
    }
}

//Removig NOte
const removeNote=(title) => {
    const arr1= loadNotes()
    //we are returning the values which is not equal to the entered note value
    const notesToKeep=arr1.filter((note) => note.title!==title)
    const duplicateNotes=arr1.filter(function(note){
        return note.title===title
    })
    //we cn use--
    //if(arr1.length < notesToKeep.length){'Note NOt Exist'}
    if(duplicateNotes.length==0){
        console.log(chalk.bgRed('Note not exist...'));  
    }
    else{
        console.log(chalk.bgGreen('Note Removed '))
        saveNotes(notesToKeep)  
    }
}

//Listing notes
const listNote=()=>{
    console.log(chalk.bgCyan('Your Notes are-- '))
    const arr2= loadNotes()
    arr2.forEach((element) => {
        console.log(element.title)   
    })
}

//Reading Notes
const readNote=(title)=>{
    const notes=loadNotes()
    const foundNote =notes.find((note) => note.title===title)
    if(foundNote){
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    }else{
        console.log('Note Not Exist ')
    }   
}



module.exports={
    //to enter multiple functions
    //getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNote:listNote,
    readNote:readNote
}