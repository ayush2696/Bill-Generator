import React from 'react';
import {Document,Page, View,Text,StyleSheet,Image} from "@react-pdf/renderer"
import logo from './logo.jpg'
const styles = StyleSheet.create({
    page:{
        borderTop: "10pt solid #5f0f40",
        marginLeft:"1pt",
        marginRight:"1pt"
        //size:"A4"
    },
    text:{
        fontSize:10,
        marginTop:"1pt"
    },
    textLabel:{
        fontSize:12,
        marginTop:"8pt"
    },
    Header:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    HeaderName:{
        paddingLeft: "30px",
        paddingTop: "20px",
        fontSize:40,
        fontWeight:"bold"
    },
    HeaderLogo:{
        height: "80px",
        width: "200px",
        paddingTop: "20px",
        paddingRight: "30px"
    },

    SenderReceiver:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "30px"

    },
    Sender:{
        paddingLeft: "30px",
        display: "flex",
        flexDirection: "column",
        width: "30%"
    },
    Receiver:{
        paddingLeft: "30px",
        display: "flex",
        flexDirection: "column",
        width: "30%"
    },
    Separator:{
        paddingTop:"15pt" ,
        borderBottom: "2pt solid #5f0f40",
        marginLeft: "15pt",
        marginRight: "15pt",
    },
    InvoiceDetails:{
        paddingLeft: "30px",
        display: "flex",
        flexDirection: "column",
        width: "30%",
        marginTop:"10pt"
    },
    table: { 
        display: "table", 
        width: "auto", 
        marginTop: "15px", 
        marginLeft: "15px",
        marginRight: "15px",
        
    }, 
    tableRow: {
  
         flexDirection: "row",
         backgroundColor : "#5f0f40",
        color: "#FFFFFF", 
    },
    tableDesc: { 
         width: "50%",
         height: "20px", 
    },
    tableQty:{
        width: "10%",
         height: "20px",
    },
    tableAmt:{
        width: "20%",
         height: "20px",
    },
    tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10,
        border:"0pt"
    },
    tableValues:{
        margin: "auto", 
        flexDirection: "row",
        backgroundColor:"#FFFFFF",
        color:"#000000",
    
    }
   
})

let count = -1;
let total = 0;
const PdfGenerator = React.memo((props)=>{
    console.log({props})
    return(
        <Document >
            <Page  size="A4">
                <View style={styles.page}>
                    <View style = {styles.Header}>
                        <View  >
                            <Text style={styles.HeaderName}>Invoice</Text>
                        </View>
                        <View style = {styles.HeaderLogo}>
                            <Image src ={logo} alt="Company Logo"></Image>
                        </View>
                    </View>
                    <View style = {styles.SenderReceiver}>
                        <View style = {styles.Sender}>
                            <Text style={styles.textLabel}>From</Text>
                                <Text style={styles.text}>{props.pdfDetails.pdf.from}</Text>
                            <Text style={styles.textLabel}>Email</Text>
                                <Text style={styles.text}>{props.pdfDetails.pdf.fromEmail}</Text>
                            <Text style={styles.textLabel} >Ph. No.</Text>
                                <Text style={styles.text}>{props.pdfDetails.pdf.fromNumber}</Text>
                        </View>
                        <View style = {styles.Receiver}>
                            <Text style={styles.textLabel}>To</Text>
                                <Text style={styles.text}>{props.pdfDetails.pdf.to}</Text>
                            <Text style={styles.textLabel}>Email</Text>
                                <Text style={styles.text}>{props.pdfDetails.pdf.toEmail}</Text>
                            <Text style={styles.textLabel}>Ph. No.</Text>
                                <Text style={styles.text}>{props.pdfDetails.pdf.toNumber}</Text>
                        </View>
                    </View>
                    <View style = {styles.Separator}>
                    </View>
                    <View style={styles.InvoiceDetails}>
                        <Text  style={styles.textLabel}>Invoice Number</Text>
                            <Text style={styles.text}>{props.pdfDetails.pdf.invoiceNumber}</Text>
                        <Text  style={styles.textLabel}>Date</Text>
                            <Text style={styles.text}>{props.pdfDetails.pdf.date}</Text>
                    </View>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}>
                            <View style={styles.tableDesc}> 
                                <Text style={styles.tableCell}>Desciption</Text> 
                            </View> 
                            <View style={styles.tableQty}> 
                                <Text style={styles.tableCell}>Qty.</Text>
                            </View> 
                            <View style={styles.tableAmt}> 
                                <Text style={styles.tableCell}>Price(per unit)</Text> 
                            </View> 
                            <View style={styles.tableAmt}> 
                                <Text style={styles.tableCell}>Amount</Text> 
                            </View> 
                        </View>
                        {props.pdfDetails.count.map( item =>{
                            count += 1;
                            {total = total + props.pdfDetails.pdf.qty[count] * props.pdfDetails.pdf.price[count]}
                            return(
                                <View style={styles.tableValues}>
                                    <View style={styles.tableDesc}> 
                                        <Text style={styles.tableCell}>{props.pdfDetails.pdf.desc[count]}</Text> 
                                    </View> 
                                    <View style={styles.tableQty}> 
                                        <Text style={styles.tableCell}>{props.pdfDetails.pdf.qty[count]}</Text>
                                    </View> 
                                    <View style={styles.tableAmt}> 
                                        <Text style={styles.tableCell}>{props.pdfDetails.pdf.price[count]}</Text> 
                                    </View> 
                                    <View style={styles.tableAmt}> 
                                        <Text style={styles.tableCell}>{props.pdfDetails.pdf.qty[count] * props.pdfDetails.pdf.price[count]}</Text>    
                                    </View> 
                                 </View>
                            )
                        }
                        )}
                        <View style={styles.tableRow}>
                            <View style={styles.tableDesc}> 
                                <Text style={styles.tableCell}>Total</Text> 
                            </View> 
                            <View style={styles.tableQty}> 
                                <Text style={styles.tableCell}>-</Text>
                            </View> 
                            <View style={styles.tableAmt}> 
                                <Text style={styles.tableCell}>-</Text> 
                            </View> 
                            <View style={styles.tableAmt}> 
                                <Text style={styles.tableCell}>{total}</Text> 
                            </View> 
                        </View>
                     </View>
                </View>
                
            </Page>
        </Document>
        
    )
});
export default PdfGenerator