# On distributed systems

Magic: the Gathering, a collectible card game I've played off and on for three decades, recently revealed a new mechanic called "behold." 
Doing so led players to resurrect a 2500 year old meme of Plato defining man as a featherless biped, and a student named Diogenes then plucking a chicken, and exclaiming, "behold a man!"

![The friends meme of Phoebe and Joey going back and forth only its Plato and Diogenes, and in the last panel, Diogenes has a plucked chicken](./behold.jpg)

Rather than learning the lesson that reductive definitions of complex things will always leave much to be desired, humanity has instead spent quite a lot of time debating the specifics of what things _are_. 
The branch of philosophy that deals with this is called Metaphysics. 
And today I'd like to take you on a pleasant stroll through the metaphysics of distributed systems. 

Lest the mixing of philosophy and computer science sound boring, let me assure you at least that I'm sitting here plucking feathers.

## Definitions

Any reasonable discussion about wha things are needs to start with what things you're talking about in the first place. 
For this post the three most important things would be computers, what we mean by distributed, and systems. 
Let's start with the last, and work our way backwards.

Some dictionary that DuckDuckGo is using defines the computing relevant definition of a system as, "A network of related computer software, hardware, and data transmission devices."
Sweet.

Of course now we need to define network, computer, software, hardware, data, transmission, and devices. 

This might seem trivial and pedantic (or just annoying), but do data transmission devices include the global network of cell towers and satellites that make our phones work? 
Does the software and hardware that runs the power plants being build to train AI models belong to that system?

A cursory glance at distributed doesn't help much.
Wikipedia says a system is distributed when two networked computers both perform work within the system. 
Pretty much every commercial app contains something that calls to some cloud. 
So is everything distributed?

Maybe definitions aren't the best place to start. 

## Appeal to authority

The truth is that language is imprecise. 
If it wasn't, metaphysics wouldn't exist in the first place.
So often we search for other ways of establishing "truth" in what it is we discuss. 

In the early seventies, Clifford Geertz--probably the most influential anthropologist of that half of the century--windmill slammed a series of essays entitled, "Religion as a Cultural System."
In it, Geertz describes religions as a system of symbols where the symbols take on specific and significant meaning for the adherents of the religion. 
If we consider tech jargon as symbols, anyone who has spent time witnessing online polemics between the adherents of different factional developers will know Geertz's definition was perhaps a little narrow.

After all, what's more sublime--transport-agnostic or transubstantiation?
More occult, Kubernetes or Kabbalah?
More haram, unauthorized use or authorized usury?

It may be a bit of a stretch to imply that religions exist due to our inability to define terms, but certainly we can appreciate the need to establish credibility by appealing to the progenitor of the terms we're trying to define. 
In the case of religion, of course, the authority to appeal to is sufficiently important enough to be recognized definitively as the authority.
Which is why no conflict has ever arisen due to religion.

Unfortunately for us developers, our authorities are flawed humans, and thus conflict is the norm. 

### Do you know the word deontological?

It is admittedly reductive to generalize about religions, but this is a programming blog post so I don't much care.
Most religions are _proscriptive_ in how humans should behave, and provide some promise of future reward for adhering to that behavior.
The fancy pants term for this type of morality is deontological, from the Greek _deon_ meaning duty. 
Namely if you perform your duty of not masturbating (honestly the constant proscription against masturbation might be the strongest argument for the divine inspiration of our planet's holy works, as it's hard to believe any human would think that to be a reasonable rule for everyone to follow), you'll get to Heaven, or find The Way, or attain Nirvana, or cross the bridge to Takamagahara or Valhalla.

Software in 2025 has similar ethics. 
It shouldn't be all that surprising that the same creatures who lean towards deontology in most things should apply it to the things that they create, but while the verdict may be out on whether we have free will or not, the machines we program definitely aren't there yet. 
The only Valhalla for them is to perhaps be recycled into future machines to try their hand in this samsara world once more.

### What's the opposite of telling people what to do?

![An intersection with no lights, and no one directing traffic](./intersection.gif)


