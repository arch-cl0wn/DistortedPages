const searchUsers = async (query) => {
    try {
       let response = await fetch('/api/users/search', {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
           },
           body:JSON.stringify({query})
       })
       return await response.json()
    }catch(err){
        console.log(err)
    }
}

export {searchUsers}