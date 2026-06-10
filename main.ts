//% color=#ff8800 icon="\uf1d9" block="Arduino Link"
namespace ArduinoLink {

    let lastLine = ""

    //% block="initialiser communication Arduino TX %tx RX %rx à %baud bauds"
    //% tx.defl=SerialPin.P0
    //% rx.defl=SerialPin.P1
    //% baud.defl=BaudRate.BaudRate9600
    export function init(tx: SerialPin, rx: SerialPin, baud: BaudRate) {
        serial.redirect(tx, rx, baud)
    }

    //% block="envoyer à Arduino %msg"
    export function send(msg: string) {
        serial.writeLine(msg)
    }

    //% block="lire message Arduino"
    export function receive(): string {
        lastLine = serial.readLine()
        return lastLine
    }

    //% block="%text est contenu dans la dernière ligne"
    export function contains(text: string): boolean {
        return lastLine.includes(text)
    }

    //% block="message Arduino disponible ?"
    export function messageDisponible(): boolean {
        return serial.available() > 0
    }
}
