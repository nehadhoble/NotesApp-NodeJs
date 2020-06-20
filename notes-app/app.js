const notes=require('./notes.js')
const yargs=require('yargs')
const chalk=require('chalk')
const fs=require('fs')
const validator=require('validator')
const { title, argv } = require('process')

//customize yargs version
yargs.version('1.1.0')
// add,remove,read,list
//create 'add' command...specifing the behavoiour of add
 yargs.command({
     command : 'add',
     describe : 'Add a new note',
     builder : {
         //the value pass to the title is object
         title :{
             describe:'Note Title',
             //by default it is false
             //this property specify command must need value/title
             demandOption:true,
             //the title property must contain string value
             //otherwise it will show blank ''
             type:'string'
         },
         body:{
             describe :'Body of note',
             demandOption:true,
             type:'string'

         }
     },
     
     //the value given to the above builder will use as argv in function
     handler(argv){
         //handler define how the command will behave when we use 'add'
             //console.log('Adding new Note!',argv)
             //following log prints only title we pass and ignore other stuff
               //console.log('title : ',argv.title, '\nDescription/body: ',argv.body); //gives peRfect output

               notes.addNote(argv.title,argv.body)
     
            }
 })

 //create remove command
 yargs.command({
     command:'remove',
     describe: 'Remove a note',
     builder : {
        title :{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        }
    },
     handler(argv){
         //console.log('Removing a Note')
         notes.removeNote(argv.title)
         //console.log('Note Removed '+argv.title)
     }
 })

 //create read command
 yargs.command({
     command:'read',
     describe:'Read a Note',
     builder:{
         title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'

         }
     },
     handler(argv){
         //console.log("Reading a Note")
         notes.readNote(argv.title)
     }
 })

 //create 'list' command
 yargs.command({
     command:'list',
     describe:'list the notes',
     handler(){
         //console.log('listing your all notes')
         notes.listNote()
     }
 })
 //yargs.argv--means yargs taking some argument
        //console.log(yargs.argv)
 //yargs.parse-- it dosent take any argument and will give appropriate output
 yargs.parse()   //use this 

