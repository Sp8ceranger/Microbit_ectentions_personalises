arduinoUART.init(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate9600)
arduinoUART.sendText("bonjour")
arduinoUART.sendNumber(42)
arduinoUART.sendKeyValue("LED", "1")

let message = arduinoUART.readLine()
if (arduinoUART.messageEquals(message, "OK")) {
    basic.showIcon(IconNames.Yes)
}
