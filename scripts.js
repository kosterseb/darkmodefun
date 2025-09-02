const body = document.body;
        const toggleButton = document.getElementById('toggleButton');
        const wittyText = document.getElementById('wittyText');
        const buttonText = document.getElementById('buttonText');

        let messages = null;
        let isDark = false;

        // Fetch witty messages from JSON file
        async function loadMessages() {
            try {
                const response = await fetch('messages.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                messages = await response.json();
                
                // Initialize with random text after loading
                updateTexts();
                
                // Enable the button once messages are loaded
                toggleButton.disabled = false;
                toggleButton.style.opacity = '1';
                
            } catch (error) {
                console.error('Failed to load messages:', error);
                
                // Fallback to error messages
                messages = {
                    messages: {
                        light: {
                            titles: ["Error loading wit! 🤷‍♂️"],
                            buttons: ["Try refreshing"]
                        },
                        dark: {
                            titles: ["Humor.exe crashed! 💥"],
                            buttons: ["Reload page"]
                        }
                    }
                };
                
                updateTexts();
                toggleButton.disabled = false;
                toggleButton.style.opacity = '1';
            }
        }

        function getRandomText(array) {
            if (!array || array.length === 0) return "No messages found!";
            return array[Math.floor(Math.random() * array.length)];
        }

        function updateTexts() {
            if (!messages) return;
            
            const mode = isDark ? 'dark' : 'light';
            const oppositeMode = isDark ? 'light' : 'dark';
            
            wittyText.textContent = getRandomText(messages.messages[mode].titles);
            buttonText.textContent = getRandomText(messages.messages[oppositeMode].buttons);
        }

        function showLoadingState() {
            wittyText.textContent = "Loading witty comments... 🤖";
            buttonText.textContent = "Please wait...";
            toggleButton.disabled = true;
            toggleButton.style.opacity = '0.7';
        }

        toggleButton.addEventListener('click', () => {
            if (!messages || toggleButton.disabled) return;
            
            isDark = !isDark;
            
            // Add a small delay to create a more dramatic effect
            setTimeout(() => {
                body.classList.toggle('dark');
                updateTexts();
            }, 100);
            console.log(`Switched to ${isDark ? 'dark' : 'light'} mode`);
        });

        // Add some sparkle on button hover
        toggleButton.addEventListener('mouseenter', () => {
            if (!toggleButton.disabled) {
                toggleButton.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });

        toggleButton.addEventListener('mouseleave', () => {
            toggleButton.style.transform = 'translateY(0) scale(1)';
        });

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            showLoadingState();
            loadMessages();
        });