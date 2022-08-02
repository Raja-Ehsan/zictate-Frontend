
export default async  function refresh(){
    return new Promise((resolve, reject) => (
        fetch("/refresh")
          .then(res => {
            return res.json()
          })
          .then(data => resolve(data))
          .catch(err => reject(err))
        ))

}