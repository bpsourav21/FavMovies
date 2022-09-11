import sequelize from "./index";
export const initDbConnection = new Promise((resolve, reject) => {
    // db sequelize
    // drop the table if resync
    let resync = true //process.env.NODE_ENV === "development";
    sequelize
        .sync({ force: resync })
        .then(() => {
            let msg = resync
                ? "Drop and re-sync db."
                : "Synced db."
            console.log(msg);
            return resolve("Db connected");
        })
        .catch((err) => {
            console.log("Failed to sync db: " + err.message);
            return reject(err.message)
        });
})