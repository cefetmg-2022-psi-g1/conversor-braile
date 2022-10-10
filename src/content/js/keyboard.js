const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        sub: false,
        sup: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("input", () => {
                this.open(element.innerHTML, currentValue => {
                    element.innerHTML = currentValue;
                });
            });
            element.addEventListener("focus", () => {
                this.open(element.innerHTML, currentValue => {
                    element.innerHTML = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "sub", "sobre","q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
             "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active");
                    });

                    break;

                case "sobre":
                    keyElement.classList.add("keyboard__key--activatable");
                    keyElement.innerHTML = "x²";

                    keyElement.addEventListener("click", () => {
                        this._toggleSuperscript();
                        keyElement.classList.toggle("keyboard__key--active");
                    });

                    break;

                case "sub":
                    keyElement.classList.add("keyboard__key--activatable");
                    keyElement.innerHTML = "x₂";

                    keyElement.addEventListener("click", () => {
                        this._toggleSubscript();
                        keyElement.classList.toggle("keyboard__key--active");
                    });

                    break;    

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        if (this.properties.sup)
                            this.properties.value += keyElement.textContent.sup()

                        else if (this.properties.sub) 
                            this.properties.value += keyElement.textContent.sub()

                        else 
                            this.properties.value += keyElement.textContent

                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },


    _toggleSuperscript() {
        if(this.properties.sub === true) {
            this._toggleSubscript()
        }

        this.properties.sup = !this.properties.sup
    },

    _toggleSubscript() {
        if(this.properties.sup === true) {
            this._toggleSuperscript()
        }

        this.properties.sub = !this.properties.sub
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                if(this.properties.capsLock){
                    if(key.textContent === '1') key.textContent = 'Δ'
                    if(key.textContent === '2') key.textContent = '𝛿'
                    if(key.textContent === '3') key.textContent = 'α'
                    if(key.textContent === '4') key.textContent = 'β'
                    if(key.textContent === '5') key.textContent = 'σ'
                    if(key.textContent === '6') key.textContent = 'π'
                    if(key.textContent === '7') key.textContent = '⇌'
                    if(key.textContent === '8') key.textContent = '→'
                    if(key.textContent === '9') key.textContent = '←'
                    if(key.textContent === '0') key.textContent = 'μ'
                } else {
                    if(key.textContent === 'δ') key.textContent = '1';
                    if(key.textContent === '𝛿') key.textContent = '2'
                    if(key.textContent === 'α') key.textContent = '3'
                    if(key.textContent === 'β') key.textContent = '4'
                    if(key.textContent === 'σ') key.textContent = '5'
                    if(key.textContent === 'π') key.textContent = '6'
                    if(key.textContent === '⇌') key.textContent = '7'
                    if(key.textContent === '→') key.textContent = '8'
                    if(key.textContent === '←') key.textContent = '9'
                    if(key.textContent === 'μ') key.textContent = '0'
                }
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});