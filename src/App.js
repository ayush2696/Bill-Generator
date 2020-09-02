import React, { useState } from 'react';
import logo from './logo.jpg';
import {useForm} from "react-hook-form";
import {PDFDownloadLink,PDFViewer} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer"
import './App.css';
import PdfGenerator from './PdfGenerator.js'

function App() {
  
  const [data,setData] = useState({});
  const [renderPdfFlag,setRenderpdfFlag] = useState(false);
  const [renderDownloadLink,setRenderDownloadLink] = useState([]);


  const { register, handleSubmit,watch,errors } = useForm();
  function returnDownloadLink(data) {
      return(
        <PDFDownloadLink 
              document={<PdfGenerator pdfDetails={{pdf:data,count:itemDom}} />}
              fileName={`${data.invoiceNumber}.pdf`}
            >
            {({blob,url,loading,error}) => loading ? <div className="DownloadButton">Loading Document</div>: <div className="DownloadButton">Download Document</div>}
            </PDFDownloadLink>
      )
  }
  const onSubmit = handleSubmit(data => {
    setData(data);
    console.log(data)
    setRenderDownloadLink([returnDownloadLink(data)]);  
  })
 
  
  function returnComponent(id){
    return(
      <div className = "Item">
        <div className="Item-Container">
          <label>Description</label>
          <textarea type="text" name = {`desc[${id}]`} ref={register}></textarea>
        </div>
        <div className="Item-Container">
          <label>Qty.</label>
          <textarea type="text" name = {`qty[${id}]`} ref={register}></textarea>
        </div>
        <div className="Item-Container">
          <label>Price</label>
          <textarea type="text" name = {`price[${id}]`} ref={register}></textarea>
        </div>
    </div>
    )
  }

  const [itemDom, setItemDom] = useState([returnComponent(0)]);
   function addItem(e){
    e.preventDefault();
    setItemDom([...itemDom,returnComponent(itemDom.length)])
  }

  function removeItem(e){
    e.preventDefault();
    let index = -1;

    setItemDom(itemDom.filter(
      (thing) =>
        {
          index+=1;
          if(index<itemDom.length-1)
            return thing;
        }
    )
  )
  }

  return (
    <form  className="App">
      <div className = "Header">
        <div className = "Header-Name">
        <h1>Invoice</h1>
        </div>
        <div className = "Header-Logo">
        <img src ={logo} alt="Company Logo"></img>
        </div>
      </div>
      <div className = "SenderReceiver">
        <div className = "Sender">
          <div className="TextLabel">
            <label>From</label>
            <textarea type="text" name = "from" ref={register}></textarea>
          </div>
          <div className="TextLabel">
            <label>Email</label>
            <textarea type="text" name = "fromEmail" ref={register}></textarea>
          </div>
          <div className="TextLabel">
            <label>Ph. No.</label>
            <textarea type="text" name = "fromNumber" ref={register}></textarea>
          </div>
        </div>
        <div className = "Receiver">
        <div className="TextLabel">
          <label>To</label>
          <textarea type="text" name = "to" ref={register}></textarea>
        </div>
        <div className="TextLabel">
          <label>Email</label>
          <textarea type="text" name = "toEmail" ref={register}></textarea>
        </div>
        <div className="TextLabel">
          <label>Ph. No.</label>
          <textarea type="text" name = "toNumber" ref={register}></textarea>
        </div>
        </div>
      </div>
      <div className = "Separator"></div>
      <div className = "InvoiceDetails">
        <div className="TextLabel">
          <label>Invoice No.</label>
          <textarea type="text" name = "invoiceNumber" ref={register}></textarea>
        </div>
        <div className="TextLabel">
          <label>Date</label>
          <textarea type="text" name = "date" ref={register}></textarea>
        </div>
      </div>
      <div className = "Separator"></div>
      <div className = "Body">
        {itemDom.map( (input) => 
        input)}
        <div className= "Buttons">
          <button onClick={e=>addItem(e)}>Add Item</button>
          <button onClick={e=>removeItem(e)}>Remove Item</button>
          <button onClick={e=>onSubmit(e)} >Submit</button>
          { renderDownloadLink.map((input)=>input)}
          {console.log(renderDownloadLink)}
          
        </div>  
      </div>
    </form>
  );
}



export default App;
