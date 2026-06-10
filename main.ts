//% color="#008577" icon="\uf1eb" block="Arduino UART"
namespace arduinoUART {
    let separator = ":"

    /**
     * Initialise la liaison UART entre la micro:bit et l'Arduino.
     * Relier TX micro:bit vers RX Arduino et RX micro:bit vers TX Arduino.
     */
    //% block="initialiser UART TX %tx RX %rx vitesse %baud"
    //% tx.defl=SerialPin.P0 rx.defl=SerialPin.P1 baud.defl=BaudRate.BaudRate9600
    //% weight=100
    export function init(tx: SerialPin, rx: SerialPin, baud: BaudRate): void {
        serial.redirect(tx, rx, baud)
        serial.setRxBufferSize(64)
        serial.setTxBufferSize(64)
    }

    /**
     * Change le separateur utilise par les messages cle/valeur.
     */
    //% block="definir separateur UART %value"
    //% value.defl=":"
    //% weight=90
    export function setSeparator(value: string): void {
        separator = value
    }

    /**
     * Envoie une ligne de texte terminee par un retour a la ligne.
     */
    //% block="envoyer texte a Arduino %message"
    //% message.defl="bonjour"
    //% weight=80
    export function sendText(message: string): void {
        serial.writeLine(message)
    }

    /**
     * Envoie un nombre sous forme de ligne texte.
     */
    //% block="envoyer nombre a Arduino %value"
    //% value.defl=0
    //% weight=70
    export function sendNumber(value: number): void {
        serial.writeLine(convertToText(value))
    }

    /**
     * Envoie un message sous la forme cle:valeur.
     */
    //% block="envoyer cle %key valeur %value a Arduino"
    //% key.defl="LED" value.defl="1"
    //% weight=60
    export function sendKeyValue(key: string, value: string): void {
        serial.writeLine(key + separator + value)
    }

    /**
     * Lit une ligne recue depuis l'Arduino.
     * La ligne est vide si aucun message complet n'est disponible.
     */
    //% block="lire ligne Arduino"
    //% weight=50
    export function readLine(): string {
        return serial.readLine()
    }

    /**
     * Lit un nombre envoye par l'Arduino.
     * Retourne 0 si le message recu n'est pas un nombre.
     */
    //% block="lire nombre Arduino"
    //% weight=40
    export function readNumber(): number {
        return parseFloat(serial.readLine())
    }

    /**
     * Vrai si le dernier message lu est egal au texte attendu.
     */
    //% block="message Arduino %message est %expected"
    //% message.defl="OK" expected.defl="OK"
    //% weight=30
    export function messageEquals(message: string, expected: string): boolean {
        return message == expected
    }

    /**
     * Recupere la partie avant le separateur dans un message cle:valeur.
     */
    //% block="cle du message %message"
    //% message.defl="LED:1"
    //% weight=20
    export function key(message: string): string {
        const index = message.indexOf(separator)
        if (index < 0) return message
        return message.substr(0, index)
    }

    /**
     * Recupere la partie apres le separateur dans un message cle:valeur.
     */
    //% block="valeur du message %message"
    //% message.defl="LED:1"
    //% weight=10
    export function value(message: string): string {
        const index = message.indexOf(separator)
        if (index < 0) return ""
        return message.substr(index + separator.length, message.length - index - separator.length)
    }
}
