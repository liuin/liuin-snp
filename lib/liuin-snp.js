'use babel';

import LiuinSnpView from './liuin-snp-view';
import { CompositeDisposable } from 'atom';

export default {

  liuinSnpView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.liuinSnpView = new LiuinSnpView(state.liuinSnpViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.liuinSnpView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'liuin-snp:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.liuinSnpView.destroy();
  },

  serialize() {
    return {
      liuinSnpViewState: this.liuinSnpView.serialize()
    };
  },

  toggle() {
    console.log('LiuinSnp was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
