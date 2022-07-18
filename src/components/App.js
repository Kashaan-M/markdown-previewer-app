import React from "react";
import { marked } from "marked";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialMarkdown = this.initialMarkdown.bind(this);
    this.buildPreview = this.buildPreview.bind(this);
    this.editorFullscreen = this.editorFullscreen.bind(this);
    this.previewFullscreen = this.previewFullscreen.bind(this);
  }

  componentDidMount() {
    const editor = document.querySelector("#editor");
    const preview = document.querySelector("#preview");
    editor.value = "# Markdown  to HTML converter App\n## Enter GitHub Flavored Markdown in the editor and see preview\n[GitHub flavored Markdown Basics](https://docs.github.com/en/get-started/writing-on-github/get…and-formatting-on-github/basic-writing-and-formatting-syntax)\n\nThis is some JavaScript Code `Console.log(\"Hello World\");`\n\nThis is a multi-line JavaScript Code\n```\nconst yourName = (firstName, lastName) => {\n\treturn `Hello ${firstName} ${lastName}`;\n}\n```\n### Markdown is better than HTML because\n* It is easier to write\n* It is easier to read\n* It is as widely used as HTML (almost)\n\n> Although using videos in markdown is not fully supported\n\n**Here is an image of freeCodeCamp logo**\n\n![freeCodeCamp Logo](https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png)";

    preview.innerHTML = marked.parse(editor.value);
    // so basically after the marked library renders the markdown into HTML I need to add the "img-fluid class to any html element that is an <img>
    // For this I use a nested loop to add the "img-fluid" class to all the html elements. This is easier than trying to filter or map or reduce

    for(let i =0; i < preview.children.length; i++) {
      preview.children[i].classList.add("img-fluid");

      for(let j=0; j < preview.children[i].children.length; j++) {
        preview.children[i].children[j].classList.add("img-fluid");
     }
   }

  }

  initialMarkdown(e) {

    // this method adds some initial markdown to "editor" atleast that is what I think it does here as well as in the 'componentDidMount() method above

    const editor = document.querySelector("#editor");
    editor.value = "# Markdown  to HTML converter App\n## Enter GitHub Flavored Markdown in the editor and see preview\n[GitHub flavored Markdown Basics](https://docs.github.com/en/get-started/writing-on-github/get…and-formatting-on-github/basic-writing-and-formatting-syntax)\n\nThis is some JavaScript Code `Console.log(\"Hello World\");`\n\nThis is a multi-line JavaScript Code\n```\nconst yourName = (firstName, lastName) => {\n\treturn `Hello ${firstName} ${lastName}`;\n}\n```\n### Markdown is better than HTML because\n* It is easier to write\n* It is easier to read\n* It is as widely used as HTML (almost)\n\n> Although using videos in markdown is not fully supported\n\n**Here is an image of freeCodeCamp logo**\n\n![freeCodeCamp Logo](https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png)";
  }
  buildPreview(e) {
   const editor = document.querySelector("#editor"); 
   const preview = document.querySelector("#preview");
   

   preview.innerHTML = marked.parse(editor.value);
   // so basically after the marked library renders the markdown into HTML I need to add the "img-fluid class to any html element that is an <img>
   // For this I use a nested loop to add the "img-fluid" class to all the html elements. This is easier than trying to filter or map or reduce

   for(let i =0; i < preview.children.length; i++) {
     preview.children[i].classList.add("img-fluid");

     for(let j=0; j < preview.children[i].children.length; j++) {
       preview.children[i].children[j].classList.add("img-fluid");
     }
   }
  }

  editorFullscreen(e) {

    // toggle the "vh-100" bootstrap class on the editor as the user clicks on the fullscreen arrow

    const editor = document.querySelector("#editor");
    const textareaCol = document.querySelector("#textarea-col");
    textareaCol.classList.toggle("vh-100");
    editor.classList.toggle("vh-100");

  }
  previewFullscreen(e) {


    // toggle the "vh-100" bootstrap class on the preview as the user clicks on the fullscreen arrow
    

    const preview = document.querySelector("#preview");
    preview.classList.toggle("vh-100");
  }
  render() {
    return (
     <main>
       <div className="container-fluid d-flex flex-column align-items-center">
         <div className="row w-100">
           <div className="col text-center">
             <h1 className="mt-5 fw-bolder text-white shadow-sm"><i className="bi bi-markdown-fill"></i> Markdown Previewer App</h1>
           </div>

         </div>
         <div className="row w-75 my-5 shadow">
           <div className="col border border-dark border-2 p-0 overflow-hidden" id="textarea-col">
             <div className="editor-bar d-flex flex-row justify-content-between align-items-center w-100">
               <p className="ms-3 my-2 fw-bold">Markdown Editor</p>
               <i onClick={this.editorFullscreen} className="bi bi-arrows-fullscreen me-3 my-2 fullscreen-arrows"></i>
             </div>
             <textarea name="" id="editor" className="w-100 h-100 p-2 overflow-scroll" onLoad={this.initialMarkdown} onKeyUp={this.buildPreview}></textarea>
           </div>
         </div>
         <div className="row w-75 shadow mt-5">
           <div className="col border border-dark border-2 p-0">
             <div className="d-flex flex-row justify-content-between align-items-center bg-info w-100 h-auto">
               <p className="ms-3 my-2 fw-bold">Markdown Preview</p>
               <i onClick={this.previewFullscreen} className="bi bi-arrows-fullscreen me-3 my-2 fullscreen-arrows"></i>
             </div> 
             <div id="preview" className="w-100 h-auto p-2 ps-3 bg-body"></div>
           </div>
         </div>
          
        <p className="h5 mt-5">Developed by <a href="https://kashaan.netlify.app" id="kashaan" className="fw-bold"> Kashaan Mahmood <i className="bi bi-arrow-up-right-square-fill "></i></a></p>
       </div>
     </main> 
    )
  }
}