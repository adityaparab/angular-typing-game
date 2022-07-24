import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';

type CharMap = {
  letter: string;
  match: string;
};
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  constructor() {}
  randomText = '';
  enteredText = '';
  matched = false;
  charMap: CharMap[] = [];

  ngOnInit(): void {
    this.reset();
  }

  onInputChange(input: string) {
    this.matched = input === this.randomText;
    this.charMap = this.charMap.map((ch, i) => ({
      ...ch,
      match: this.getHighlighClass(ch.letter, input[i]),
    }));
    this.enteredText = input;
  }

  private getRandomText() {
    const lengths = [3, 4, 5, 6, 7];
    const randomLength = lengths[Math.floor(Math.random() * lengths.length)];
    return faker.lorem.sentence(randomLength);
  }

  private getHighlighClass(currentChar: string, enteredChar: string) {
    if (!enteredChar) return 'pending';

    if (currentChar === enteredChar) return 'correct';

    return currentChar !== ' ' ? 'incorrect' : 'incorrect bg';
  }

  reset() {
    this.randomText = this.getRandomText();
    this.charMap = this.randomText
      .split('')
      .map((c) => ({ letter: c, match: '-' }));
    this.enteredText = '';
    this.matched = false;
  }
}
