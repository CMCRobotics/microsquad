let config = {
    MQTT_URI: process.env.MQTT_URI || "ws://broker.emqx.io:8083",
    MQTT_TOPIC_ROOT: process.env.MQTT_TOPIC_ROOT || "microsquad",
}

if (process.env.NODE_ENV === 'production') {
    config.MQTT_URI = "MQTT_URI_REPLACE";
    config.MQTT_TOPIC_ROOT = "MQTT_TOPIC_ROOT_REPLACE";
}

export default config;