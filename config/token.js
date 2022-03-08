module.exports = app => {
    const generate = (length) => {
        var char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("")
        var token = []

        for (let i = 0; i < length; i++) {
            var j = (Math.random() * (char.length - 1 )).toFixed(0)
            token[i] = char[j]
        }

        return token.join("")
    }
    return { generate }
}