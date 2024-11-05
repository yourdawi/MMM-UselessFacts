Module.register("MMM-UselessFacts", {
    defaults: {
        updateInterval: 300000, // 5min
        fadeSpeed: 4000,
        language: "en" // Default, Change in Config
    },

    start: function() {
        this.fact = "";
        this.scheduleUpdate();
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "useless-fact";
        wrapper.innerHTML = this.fact;
        return wrapper;
    },

    scheduleUpdate: function() {
        var self = this;
        setInterval(function() {
            self.updateFact();
        }, this.config.updateInterval);
        this.updateFact();
    },

    updateFact: function() {
        var self = this;
        var apiUrl = `https://uselessfacts.jsph.pl/random.json?language=${this.config.language}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                self.fact = data.text;
                self.updateDom(self.config.fadeSpeed);
            });
    }
});
