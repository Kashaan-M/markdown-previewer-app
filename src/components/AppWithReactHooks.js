import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

const initialMarkup = "# Markdown  to HTML converter App\n## Enter GitHub Flavored Markdown in the editor and see preview\n[GitHub flavored Markdown Basics](https://docs.github.com/en/get-started/writing-on-github/get…and-formatting-on-github/basic-writing-and-formatting-syntax)\n\nThis is some JavaScript Code `Console.log(\"Hello World\");`\n\nThis is a multi-line JavaScript Code\n```\nconst yourName = (firstName, lastName) => {\n\treturn `Hello ${firstName} ${lastName}`;\n}\n```\n### Markdown is better than HTML because\n* It is easier to write\n* It is easier to read\n* It is as widely used as HTML (almost)\n\n> Although using videos in markdown is not fully supported\n\n**Here is an image of freeCodeCamp logo**\n\n![freeCodeCamp Logo](https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png)" ;

function App() {

  const [markup, setMarkup] = useState(initialMarkup);
  const editorRef = useRef(null);
  const textAreaColRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    editorRef.current.value = initialMarkup;
    addImgFluidClassesAndGeneratePreview(editorRef.current.value);

  },[]);
  
  function editorFullscreen(e) {
    // toggle the "vh-100" bootstrap class on the editor as the user clicks on the fullscreen arrow
    editorRef.current.classList.toggle("vh-100");
    /* Above line of code is same as doing
    
       const editor = document.querySelector("#editor");
       editor.classList.toggle("vh-100");
    */
    textAreaColRef.current.classList.toggle("vh-100");
    /* Above line of code is same as doing
    
       const textareaCol = document.querySelector("#textarea-col");
       textareaCol.classList.toggle("vh-100");
    */
  }

  function buildPreview(e) {
  //  const editor = document.querySelector("#editor"); 
  //  const preview = document.querySelector("#preview");
  //  const newMarkup = editor.value;
   const newMarkup = e.target.value;
  //  this.setState({markup: newMarkup});
   setMarkup(newMarkup);
  //  preview.innerHTML = marked.parse(newMarkup);

  addImgFluidClassesAndGeneratePreview(newMarkup);
  }

  function addImgFluidClassesAndGeneratePreview(val) {

    previewRef.current.innerHTML = marked.parse(val);
    // so basically after the marked library renders the markdown into HTML I need to add the "img-fluid class to any html element that is an <img>
    // For this I use a nested loop to add the "img-fluid" class to all the html elements. This is easier than trying to filter or map or reduce

    for(let i =0; i < previewRef.current.children.length; i++) {
      previewRef.current.children[i].classList.add("img-fluid");

      for(let j=0; j < previewRef.current.children[i].children.length; j++) {
        previewRef.current.children[i].children[j].classList.add("img-fluid");
      }
    }
  }

  return(
  <main>
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className="row w-50">
        <div className="col text-center">
          <h1 className="mt-5 fw-bolder text-white lh-lg border-bottom border-top rounded  border- 1 border-white"><i className="bi bi-markdown-fill"></i> Markdown Previewer App</h1>
        </div>
      </div>

      <div className="row width-90 w-75 my-5 shadow">
        <div className="col border border-dark border-2 p-0" id="textarea-col" ref={textAreaColRef}>
          <div className="editor-bar d-flex flex-row justify-content-between align-items-center w-100 border-bottom border-2 border-dark">
            <p className="ms-3 my-2 fw-bold">Markdown Editor</p>
            <i onClick={editorFullscreen} className="bi bi-arrows-fullscreen me-3 my-2 fullscreen-arrows"></i>
          </div>
          <textarea name="" id="editor" ref={editorRef} className="w-100 h-100 p-2 overflow-scroll" value={markup} onChange={buildPreview}></textarea>
        </div>
      </div>

      <div className="row width-90 w-75 shadow mt-5">
        <div className="col border border-dark border-2 p-0">
          <div className="d-flex flex-row justify-content-between align-items-center bg-info w-100 h-auto border-bottom border-2 border-dark">
            <p className="ms-3 my-2 fw-bold">Markdown Preview</p>
          </div>
          <div id="preview" ref={previewRef} className="w-100 h-auto p-2 ps-3 bg-body"></div>
        </div> 
      </div>

      <p className="h5 mt-5">Developed by <a href="https://kashaan.netlify.app" id="kashaan" className="fw-bold"> Kashaan Mahmood <i className="bi bi-arrow-up-right-square-fill "></i></a></p>
    </div>
  </main>
  );
}

export default App;