const redis = require('redis');

const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
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


module.exports = {
    addDataRedis,
    getDataByIdRedis,
};