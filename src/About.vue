<style scoped>
.frac {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  letter-spacing: 0.001em;
  text-align: center;
}
.frac > span {
  display: block;
  padding: 0.1em;
}
.frac span.bottom {
  border-top: thin solid black;
}
.frac span.symbol {
  display: none;
}
</style>
<template>
  <div>
    <div class="container content is-small">
      <div class="is-size-6">
        <h2 subtitle="h2">Usage</h2>
        <hr />
        <div class="level">
          <img src="./usage.png" />
        </div>
        <ol type="1">
          <li>Export (copy to your clipboard) a deck list from the MTGArena client or your favorite deck website.</li>
          <li>Paste the deck list into the "Deck" text area under the "Inputs" section.</li>
          <li>
            Optionally configure your mulligan strategy. You can specify the
            maximum number of mulligan rounds, the number of desired lands, and if you are on the play or draw.
          </li>
          <li>The "Results" section updates automatically in response to any changes in the "Inputs" section.</li>
          <li>Share your results with others by pressing the "Copy link" button to copy the URL to your clipboard.</li>
        </ol>
        <h2 subtitle="h2">Interpreting the results</h2>
        <hr />
        <div class="level">
          <img class="level-item" src="./results.png" />
        </div>Read the following articles for context:
        <ul>
          <li>
            <a
              href="https://www.channelfireball.com/all-strategy/articles/how-many-lands-do-you-need-to-consistently-hit-your-land-drops/"
            >How Many Lands Do You Need to Consistently Hit Your Land Drops?</a> by Frank Karsten
          </li>
          <li>
            <a
              href="https://www.channelfireball.com/articles/how-many-colored-mana-sources-do-you-need-to-consistently-cast-your-spells-a-guilds-of-ravnica-update/"
            >How Many Colored Mana Sources Do You Need to Consistently Cast Your Spells? A Guilds of Ravnica Update</a> by Frank Karsten
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Conditional_probability">Conditional probability</a>
          </li>
        </ul>MTG On Curve simulates 1,000,000 random hands from the specified deck list and mulligan strategy and for each non-land card in the deck, counts the number of hands that
        have sufficient mana to pay the cost of the card by some turn. By default, the turn is the CMC cost of the card (the on curve turn), but this can be overriden by specifying a turn modifier for the card (see the Advanced section below).
        These counts are used to calculate the various probabilities in the results table:
        <ul>
          <li>
            <span class="has-text-weight-semibold">P(mana|turn)</span>: The probability to pay the mana cost by the turn, conditional on drawing turn land cards. Cards with P(mana|turn) >= 90% are highlighted in blue.
            <br />This is the same number Frank Karsten calculates in order to determine if a deck can consistently cast a card on curve.
          </li>
          <li>
            <span class="has-text-weight-semibold">P(mana)</span>: The unconditional probability pay the mana cost by the turn.
          </li>
          <li>
            <span class="has-text-weight-semibold">P(play)</span>: The unconditional probability pay the mana cost and have at least one copy of the card in hand by the turn. This is how often in practice you can expect to play a card by the turn.
          </li>
        </ul>The simulation makes several assumptions in order to simplify the implementation:
        <ul>
          <li>The only card draw comes from the card draw step at the beginning of each turn.</li>
          <li>Only cards listed in the "Mana Sources" table are used to calculate paying the cost of a card. You can force a card to count as a mana source, or override the mana sources of an existing land card, by specifying a mana modifier for the card (see the Advanced section below).</li>
          <li>All mana sources come into play untapped.</li>
          <li>Card abilities that alter the cost of a card, such as convoke or delve, are not simulated.</li>
          <li>Card abilities that alter the mulligan process, such as Serum Powder, are not simulated</li>
          <li>Card abilities that alter the starting hand size are not simulated</li>
          <li>Card abilities that alter the starting cards in hand are not simulated.</li>
          <li>Phyrexian mana is not simulated.</li>
          <li>The MTG Arena best-of-one starting hand implementation is not simulated.</li>
        </ul>So what is the simulation capable of modeling?
        <ul>
          <li>The London mulligan process.</li>
          <li>Cards that cost multiple mana colors.</li>
          <li>Cards with hybrid mana costs.</li>
          <li>Lands that source multiple mana colors.</li>
        </ul>The goal of this tool is not to simulate all the game mechanics, but to give users a baseline from which they can make informed decisions about their deck and manabase. It is up to you to use your best judement when interpreting the results.
        <h2 subtitle="h2">Advanced</h2>
        <hr />You can specify card modifiers to change attributes such as the turn a card is played, the X mana cost of a card, and even force a card to behave as a land card with specific mana sources.
        <div class="level">
          <img class="level-item" src="./advanced.png" />
        </div>
        <ul>
          <li>
            You can change the turn to play a card by specifying a turn offset at the end of any card line in the deck list:
            <span
              class="has-text-weight-semibold"
            >#T = 1</span>.
            <br />By default T = 0 for all cards, which corresponds to playing the card on the CMC turn (on curve).
          </li>
          <li>
            You can force any card to behave as a land card with specific color sources by specfiying a mana string at the end of the card line in the deck list:
            <span
              class="has-text-weight-semibold"
            >#M = {R}{G}{B}{U}{W}{1}</span>
            <br />This allows you to treat non-land cards (such as "Llanowar Elves") as mana sources. Be careful when interpreting the results,
            as the simulation does not take into account any requirements to play the card, including the mana cost. The simulation treats the
            card as an unconditional land card that can be played untapped at any turn.
          </li>
          <li>
            You can specify the "X" cost of a card by specifying the X modifier at the end of a card line in the deck list:
            <span
              class="has-text-weight-semibold"
            >#X = 4</span>.
            <br />By default X = 1 for any card with an X mana cost.
          </li>
        </ul>
        <h2 subtitle="h2">Acknowledgments</h2>
        <hr />
        <ul>
          <li>
            Card data and on-hover images from
            <a href="https://scryfall.com/">https://scryfall.com</a>
          </li>
          <li>
            CSS mana icons from
            <a
              href="https://andrewgioia.github.io/Mana/"
            >https://andrewgioia.github.io/Mana</a>
          </li>
          <li>
            <a
              href="https://www.channelfireball.com/all-strategy/articles/how-many-lands-do-you-need-to-consistently-hit-your-land-drops/"
            >How Many Lands Do You Need to Consistently Hit Your Land Drops? by Frank Karsten</a>
          </li>
          <li>
            <a
              href="https://www.channelfireball.com/articles/how-many-colored-mana-sources-do-you-need-to-consistently-cast-your-spells-a-guilds-of-ravnica-update/"
            >How Many Colored Mana Sources Do You Need to Consistently Cast Your Spells? A Guilds of Ravnica Update by Frank Karsten</a>
          </li>
        </ul>

        <hr />
        <div class="container">
          <span
            class="has-text-left"
          >Magic the Gathering, Magic the Gathering Arena and related logos are registered trademarks, trademarks and/or copyright of Wizards of the Coast, Inc, a subsidiary of Hasbro, Inc. All rights reserved. All art is property of their respective artists and/or Wizards of the Coast Inc. This website is not produced, endorsed, supported, or affiliated with Wizards of the Coast Inc.</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ManaCostRender from "./ManaCostRender.vue";

export default {
  components: { ManaCostRender },
  data() {
    return {};
  }
};
</script>
