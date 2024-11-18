/**
 * @name ClickSound
 * @author Brunitux
 * @authorId 730639168421756978
 * @description Makes a clicking sound when a button is pressed, and thats it.
 * @version 1.0.1
 * @updateUrl https://raw.githubusercontent.com/brunitux/ClickSound/refs/heads/main/ClickSound.plugin.js
 * @source https://github.com/brunitux/ClickSound
 * @website https://github.com/brunitux/ClickSound
 */
                    const click1 = new Audio('https://github.com/brunitux/clickDiscord/raw/refs/heads/main/click-infmsujy_FfKeOylz.wav');
                    const click2 = new Audio('https://github.com/brunitux/clickDiscord/raw/refs/heads/main/click-infmsujy_FfKeOylz.wav');
                    const click3 = new Audio('https://github.com/brunitux/clickDiscord/raw/refs/heads/main/click-infmsujy_FfKeOylz.wav');
                    const backspace = new Audio('https://github.com/brunitux/clickDiscord/raw/refs/heads/main/click-infmsujy_FfKeOylz.wav');
                 //   const enter = new Audio('https://github.com/brunitux/clickDiscord/raw/refs/heads/main/click-infmsujy_FfKeOylz.wav');
module.exports = (() => {
    const config = {
        info: {
            name: 'ClickSound',
            authors: [{
                name: 'Brunitux',
                discord_id: '730639168421756978',
                github_username: 'brunitux'
            }],
            version: '1.0.1',
            description: 'Makes a clicking sound when a button is pressed, and thats it.',
            github: 'https://github.com/brunitux/ClickSound',
            github_raw: 'https://raw.githubusercontent.com/brunitux/ClickSound/refs/heads/main/ClickSound.plugin.js'
        },
        version: '1.0.1',
        changelogItems: [
            {
                version: '1.0.1',
                title: 'v1.0.1: Primeira versão!',
                type: 'added',
                items: [
                    'Adicionei novos sons',
                    'Criei um repositório aberto',
                    'Novas atualizações em breve'
                ]
            }
        ],
        get changelog() {
            const item = this.changelogItems.find(item => item.version === this.version);
            if (!item) return item;
            return [item];
        },
        defaultConfig: [{
            type: "slider",
            id: "volume",
            name: "Volume",
            note: "Changes volume of clicks",
            value: 50,
            min: 0,
            max: 100,
            markers: Array.from(Array(11), (_, i) => 10 * i),
            stickToMarkers: true
        },
            {
            type: "textbox",
            id: "exceptions",
            name: "Exceptions (Requires Reload)",
            note: "Add keys here to stop them from making a click sound. Separate keys by a comma, no space {Key1,Key2}. Letter keys are formatted like this: \"KeyA\". Easily see key codes here: https://keycode.info",
            value: ",,ControlLeft,ControlRight,ShiftLeft,ShiftRight,AltLeft,AltRight,ArrowUp,ArrowRight,ArrowLeft,ArrowDown,CapsLock,MetaLeft,MetaRight,MediaPlayPause,",
        }]
    };

 return !global.ZeresPluginLibrary ? class {

        constructor() { this._config = config; }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(', '); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal('Library Missing', `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: 'Download Now',
                cancelText: 'Cancel',
                onConfirm: () => {
                    require('request').get('https://betterdiscord.app/Download?id=9', async (error, response, body) => {
                        if (error) return require('electron').shell.openExternal('https://betterdiscord.app/Download?id=9');
                        await new Promise(r => require('fs').writeFile(require('path').join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, r));
                    });
                }
            });
        }
        start() {
            ZeresPluginLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), 'https://raw.githubusercontent.com/brunitux/ClickSound/refs/heads/main/ClickSound.plugin.js');
        if (window.PluginUpdates && window.PluginUpdates.plugins) delete PluginUpdates.plugins['https://raw.githubusercontent.com/brunitux/ClickSound/refs/heads/main/ClickSound.plugin.js'];
         }
        stop() { }

    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {
                DiscordModules
            } = Api;
    
            const {
                DiscordConstants
            } = DiscordModules;
    

            return class clicker extends Plugin {
                
                onStart() {
                    var keyArray = this.createExceptions()
                    
                    document.addEventListener('keydown', clicking);
                    this.clicking = clicking;
                    
                        async function clicking(e) {
                        var num = Math.floor(Math.random() * 3) + 1 // Generate a random number, used later to determine which click sound will be played
                        function playSound(click) {
                            backspace.pause()
                            backspace.currentTime = 0
                            click1.pause()
                            click1.currentTime = 0
                            click2.pause()
                            click2.currentTime = 0
                            click3.pause()
                            click3.currentTime = 0
                            click.play(click)
                        }
                        async function click() {

                            if (keyArray.includes(e.code)) // Checks the array 'keyArray', and if the condition is met, do nothing
                                return
                            else if (e.code == 'Backspace') {
                                playSound(backspace)
                            }
                            else if (num == 1) {
                                playSound(click1)
                            }
                            else if (num == 2) {
                                playSound(click2)
                            }
                            else if (num == 3) {
                                playSound(click3)
                            }
                        }
                        click()
                    }
                }
                stop() {
                    document.removeEventListener('keydown', this.clicking);
                }
                changeVolume() {
                    click1.volume = (this.settings.volume / 1000);
                    click2.volume = (this.settings.volume / 1000);
                    click3.volume = (this.settings.volume / 1000);
                    backspace.volume = (this.settings.volume / 1000);
                }
                createExceptions() {
                    return this.settings.exceptions.split(",")
                }
                getSettingsPanel() {
                    const panel = this.buildSettingsPanel();
                    panel.addListener((id) => {
                        if (id == "volume") {
                            this.changeVolume()
                        } else if (id == "exceptions") {
                            this.createExceptions()
                        }

                    });
                    return panel.getElement();
                }
            
            }
        }
    
    return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
})();
