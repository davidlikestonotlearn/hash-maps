class HashMap {
    
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.size = 0 // Size of entries
        this.buckets = [] // Empty array to start off
        for (let i = 0; i < capacity; i++) {
            this.buckets.push([]) 
        }
    }

    // Creates Hash Code for tested keys
    hash(key) {
        let hashCode = 0

        const primeNum = 31
        for (let i = 0; i < key.length; i++) {
            hashCode = ( primeNum * hashCode + key.charCodeAt(i) ) % this.capacity
        }

        return hashCode
    }

    getBucket(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        return this.buckets[index]
    }

    set(key, value) {
        const index = this.hash(key)
        
        // Grabs the bucket of the key
        const bucket = this.getBucket(index)

        // Checks values in bucket index
        // Pair 0 - KEY  ,  Pair 1 - Value
        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value // Overwrite Pair 1
                return
            } 
        }

        bucket.push([key, value])
        this.size++

        if (this.size > this.capacity * this.loadFactor) this.grow()
    }

    get(key) {
        const index = this.hash(key)
        const bucket = this.getBucket(index)
        
        // Loops through each pairs in that keys bucket
        for (const pair of bucket) {
            if (pair[0] === key) {
                return pair[1]
            }
        }
        return undefined
    }

    has(key) {
        const index = this.hash(key)
        const bucket = this.getBucket(index)

        for (const pair of bucket) {
            if (pair[0] === key) return true
        }

        return false
    }

    remove(key) {
        const index = this.hash(key)
        const bucket = this.getBucket(index)
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1) // At position i, remove 1 pair
                this.size--
                return true
            }
        }

        return false
    }

    length() {
        return this.size
    }

    clear() {
        this.buckets = [] // Empty array to start off again
        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([])
        }

        this.size = 0
    }

    keys() {
        const result = []
        const buckets = this.buckets

        buckets.forEach(bucket => {
            bucket.forEach(pair => {
                result.push(pair[0])
            })
        })
        
        return result
    }

    values() {
        const result = []
        const buckets = this.buckets

        buckets.forEach(bucket => {
            bucket.forEach(pair => {
                result.push(pair[1])
            })
        })
        
        return result
    }

    entries() {
        const result = []
        const buckets = this.buckets

        buckets.forEach(bucket => {
            bucket.forEach(pair => {
                result.push([pair[0], pair[1]])
            })
        })

        return result
    }

    grow() {
        const savedEntries = this.entries()
        this.capacity *= 2 // Doubles Capacity

        // Reset buckets (but capacity is doubled)
        this.buckets = [] // Empty array to start off
        for (let i = 0; i < this.capacity; i++) {
            this.buckets.push([]) 
        }

        // Resets size since set will size them again
        this.size = 0

        // Sets entries again
        savedEntries.forEach(entry => {
            this.set(entry[0], entry[1])
        })
    }

    
}

const map = new HashMap()

map.set('apple', 'red')
map.set('apple', 'green')
console.log(map.get('apple')) // green
console.log(map.has('pear')) // False
console.log(map.remove('apple')) // True
map.set('apple', 'red') 
console.log(map.has('apple'))
console.log(map.buckets)
console.log(map.size)