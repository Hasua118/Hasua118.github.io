const utils ={
    getDataFromDoc(doc){
        let data = doc.data()
        data.id = doc.id
        return data
   
   },
   getDataFromDocs(docs){
       let result =[]
       for(let doc of docs){
           let data = utils.getDataFromDoc(doc)
           result.push(data)
        }
       return result
   }
}