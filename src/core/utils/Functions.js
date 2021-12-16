module.exports = {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    async uniqueNumber () {  
        const random = Math.floor(Math.random() * 1000000000) + 1; 
        const unique = random+Date.now();
        return unique; 
    },

    /**
     * Where to redirect users when the intended url fails.
     *
     * @var string
     */
    async slug (Text) {
        return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
    },

    /**
     * Where to redirect users when the intended url fails.
     *
     * @var string
     */
    async titleCase (str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    },
}


