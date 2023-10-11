class LocalStorageManager {
    // Constructor que toma un nombre de espacio para evitar colisiones con claves en localStorage.
    constructor(namespace) {
        this.namespace = namespace;
    }

    // Obtener un valor del almacenamiento local.
    get(key) {
        const data = localStorage.getItem(this.getNamespacedKey(key));
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    // Establecer un valor en el almacenamiento local.
    set(key, value) {
        localStorage.setItem(this.getNamespacedKey(key), JSON.stringify(value));
    }

    // Eliminar un valor del almacenamiento local.
    remove(key) {
        localStorage.removeItem(this.getNamespacedKey(key));
    }

    // Obtener una clave con el espacio de nombres.
    getNamespacedKey(key) {
        return `${this.namespace}:${key}`;
    }
}
