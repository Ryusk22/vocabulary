FROM ruby:2.6.1
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn chromium-driver

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
apt-get install nodejs

# yarnパッケージ管理ツール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

RUN mkdir /vocabulary

WORKDIR /vocabulary

ADD Gemfile /vocabulary/Gemfile
ADD Gemfile.lock /vocabulary/Gemfile.lock

RUN gem install bundler && bundle install

COPY . /vocabulary

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
