


async function getProducts() {
try {
    const url= 'http://localhost:8080/api/products/'+id
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({price: newPrice})
    }
    await fetch(url, options)
    .then((response)=>{
        // evaluate the API response
        if (!response.ok) throw new Error(response.error)
    })
} catch (error) {
    console.log(error)
    return false
            
}
return true
}