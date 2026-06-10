# microbit-arduino-uart

Extension MakeCode pour faire communiquer une micro:bit avec un Arduino en UART.

## Branchement

Par defaut, l'extension utilise :

- `P0` micro:bit `TX` vers `RX` Arduino
- `P1` micro:bit `RX` vers `TX` Arduino
- `GND` micro:bit vers `GND` Arduino
- vitesse `9600 bauds`

Important : la micro:bit fonctionne en 3,3 V. Si l'Arduino utilise une logique 5 V, mets un diviseur de tension ou un convertisseur de niveau logique sur la ligne `TX Arduino -> RX micro:bit`.

## Utilisation MakeCode

1. Ajoute cette extension dans MakeCode.
2. Dans `au demarrage`, utilise le bloc `initialiser UART`.
3. Envoie des messages avec `envoyer texte a Arduino`, `envoyer nombre a Arduino` ou `envoyer cle valeur a Arduino`.
4. Lis les reponses avec `lire ligne Arduino`.

Exemple MakeCode TypeScript :

```typescript
arduinoUART.init(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate9600)

basic.forever(function () {
    arduinoUART.sendKeyValue("TEMP", "23")
    basic.pause(1000)

    let message = arduinoUART.readLine()
    if (arduinoUART.messageEquals(message, "OK")) {
        basic.showIcon(IconNames.Yes)
    }
})
```

## Exemple Arduino

Pour un Arduino Uno, il vaut mieux utiliser `SoftwareSerial` afin de garder le port USB disponible pour le moniteur serie.

```cpp
#include <SoftwareSerial.h>

SoftwareSerial microbit(10, 11); // RX, TX

void setup() {
  Serial.begin(9600);
  microbit.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  if (microbit.available()) {
    String message = microbit.readStringUntil('\n');
    message.trim();

    Serial.println("Microbit: " + message);

    if (message == "LED:1") {
      digitalWrite(LED_BUILTIN, HIGH);
      microbit.println("OK");
    } else if (message == "LED:0") {
      digitalWrite(LED_BUILTIN, LOW);
      microbit.println("OK");
    } else {
      microbit.println("RECU:" + message);
    }
  }
}
```

Branchement avec cet exemple Arduino :

- `P0` micro:bit vers pin `10` Arduino
- `P1` micro:bit vers pin `11` Arduino
- `GND` micro:bit vers `GND` Arduino

## Import dans MakeCode

Le plus simple est de mettre ce dossier dans un depot GitHub public, puis dans MakeCode :

`Extensions` -> `Importer l'URL` -> colle l'URL du depot GitHub.

## Blocs fournis

- `initialiser UART TX RX vitesse`
- `definir separateur UART`
- `envoyer texte a Arduino`
- `envoyer nombre a Arduino`
- `envoyer cle valeur a Arduino`
- `lire ligne Arduino`
- `lire nombre Arduino`
- `message Arduino est`
- `cle du message`
- `valeur du message`
