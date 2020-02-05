require 'test_helper'

class BocabularyControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get bocabulary_index_url
    assert_response :success
  end

end
