require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Could not connect to Redis:', error);
    }
})();

const addDataRedis = async (id, data, expirationInSeconds = 3600) => {
    try {
        await redisClient.set(id, JSON.stringify(data), {
            EX: expirationInSeconds,
        });
    } catch (error) {
        throw error;
    }
};

const getDataByIdRedis = async (id) => {
    try {
        const data = await redisClient.get(id);
        if (!data) {
            return null;
        }
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
};

const deleteDataByIdRedis = async (id) => {
    try {
        const result = await redisClient.del(id);
        if (result === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

const getOrCacheData = async (listKey, getDataFunction, expireSeconds = 3600) =>{
    try {
        const items = await redisClient.lRange(listKey, 0, -1);
    
        if (items.length > 0) {
            return items.map(item => JSON.parse(item));
        } 
        else {
            const data = await getDataFunction(listKey);
        
            await redisClient.rPush(listKey, data.map(item => JSON.stringify(item)));
            await redisClient.expire(listKey, expireSeconds);
        
            return data;
        }
      } 
      catch (error) {
        throw new Error(`Error al manejar los datos: ${error.message}`);
      }
    };

const deleteCacheList = async(listKey) => {
    try {
        await redisClient.del(listKey);
    } catch (error) {
        console.error(`Error al eliminar la lista con clave "${listKey}":`, error);
    }
    }

module.exports = {
    addDataRedis,
    getDataByIdRedis,
    deleteDataByIdRedis,
    getOrCacheData,
    deleteCacheList
};