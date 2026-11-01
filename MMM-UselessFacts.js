Module.register("MMM-UselessFacts", {
    defaults: {
        updateInterval: 300000, // 5min
        fadeSpeed: 4000,
        language: "en" // Default, Change in Config
    },

    getStyles: function() {
        return ["MMM-UselessFacts.css"];
    },

    start: function() {
        this.fact = "";
        this.loaded = false;
        this.timer = null;
        this.updateFact();
    },

    suspend: function() {
        clearTimeout(this.timer);
        this.timer = null;
    },

    resume: function() {
        if (!this.timer) {
            this.updateFact();
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "useless-fact";
        wrapper.textContent = this.loaded ? this.fact : "Loading...";
        return wrapper;
    },

    scheduleUpdate: function() {
        var self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            self.updateFact();
        }, this.config.updateInterval);
    },

    updateFact: function() {
        var self = this;
        var apiUrl = "https://uselessfacts.jsph.pl/random.json?language=" +
            encodeURIComponent(this.config.language);
        fetch(apiUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                if (data && data.text) {
                    self.fact = data.text;
                    self.loaded = true;
                    self.updateDom(self.config.fadeSpeed);
                }
            })
            .catch(function(error) {
                Log.error("MMM-UselessFacts: could not fetch fact: " + error.message);
            })
            .then(function() {
                self.scheduleUpdate();
            });
    }
});
