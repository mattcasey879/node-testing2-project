const db = require("../dbConfig")





const getAll = () => {
 return db("forceUsers")
}

const getById = async (id) => {
 return db("forceUsers").where({id}).first()
}

const insert = async (forceUser) => {
    const [id] = await db('forceUsers').insert(forceUser)
    return getById(id)
}

const remove = async (id) => {
    const deletedUser = await getById(id)
    await db('forceUsers').where("id", id).del()
    return deletedUser
}

module.exports = {
    insert,
    remove,
    getAll,
    getById
}