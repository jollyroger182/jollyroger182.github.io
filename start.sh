#!/bin/bash

source /usr/local/share/chruby/chruby.sh
chruby ruby-3.3.6
bundle exec jekyll serve --host 0.0.0.0 -l

