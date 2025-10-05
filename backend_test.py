#!/usr/bin/env python3
"""
Backend API Testing Suite for Portfolio Application
Tests all backend endpoints with proper validation and error handling
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
BASE_API_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {BASE_API_URL}")

class PortfolioAPITester:
    def __init__(self):
        self.passed_tests = 0
        self.failed_tests = 0
        self.test_results = []
        
    def log_test(self, test_name, passed, message="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        if response_data and not passed:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            'test': test_name,
            'passed': passed,
            'message': message,
            'response': response_data
        })
        
        if passed:
            self.passed_tests += 1
        else:
            self.failed_tests += 1
    
    def test_health_check(self):
        """Test 1: Basic health check endpoint GET /api/"""
        try:
            response = requests.get(f"{BASE_API_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and data["message"] == "Hello World":
                    self.log_test("Health Check Endpoint", True, "Returns correct Hello World message")
                else:
                    self.log_test("Health Check Endpoint", False, f"Unexpected response format: {data}", data)
            else:
                self.log_test("Health Check Endpoint", False, f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Health Check Endpoint", False, f"Connection error: {str(e)}")
    
    def test_portfolio_data(self):
        """Test 2: Portfolio data endpoint GET /api/portfolio"""
        try:
            response = requests.get(f"{BASE_API_URL}/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check response structure
                if "success" in data and "data" in data and data["success"]:
                    portfolio_data = data["data"]
                    
                    # Validate required portfolio sections
                    required_sections = ["personal", "currentWork", "coreStrengths", "skills", 
                                       "experience", "earlyProjects", "education", "leadership"]
                    
                    missing_sections = [section for section in required_sections if section not in portfolio_data]
                    
                    if not missing_sections:
                        # Validate personal info structure
                        personal = portfolio_data.get("personal", {})
                        required_personal_fields = ["name", "title", "email", "bio"]
                        missing_personal = [field for field in required_personal_fields if field not in personal]
                        
                        if not missing_personal:
                            self.log_test("Portfolio Data Endpoint", True, 
                                        f"Returns complete portfolio data with all sections")
                        else:
                            self.log_test("Portfolio Data Endpoint", False, 
                                        f"Missing personal fields: {missing_personal}")
                    else:
                        self.log_test("Portfolio Data Endpoint", False, 
                                    f"Missing portfolio sections: {missing_sections}")
                else:
                    self.log_test("Portfolio Data Endpoint", False, 
                                f"Invalid response structure: {data}", data)
            else:
                self.log_test("Portfolio Data Endpoint", False, 
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Portfolio Data Endpoint", False, f"Connection error: {str(e)}")
    
    def test_contact_form_valid(self):
        """Test 3: Contact form endpoint POST /api/contact with valid data"""
        valid_contact_data = {
            "name": "Alex Johnson",
            "email": "alex.johnson@gamedev.com",
            "subject": "Collaboration Opportunity for Multiplayer Game Project",
            "message": "Hi Jatin, I came across your portfolio and I'm impressed with your work on Dream Cricket 2024, especially the multiplayer networking implementation. I'm working on a new multiplayer sports game and would love to discuss potential collaboration opportunities. Your experience with anti-cheat systems and disconnection handling would be invaluable for our project."
        }
        
        try:
            response = requests.post(f"{BASE_API_URL}/contact", 
                                   json=valid_contact_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "success" in data and "message" in data and data["success"]:
                    self.log_test("Contact Form Valid Submission", True, 
                                f"Successfully submitted contact form: {data['message']}")
                else:
                    self.log_test("Contact Form Valid Submission", False, 
                                f"Invalid response structure: {data}", data)
            else:
                self.log_test("Contact Form Valid Submission", False, 
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Valid Submission", False, f"Connection error: {str(e)}")
    
    def test_contact_form_validation(self):
        """Test 4: Contact form validation with invalid data"""
        
        # Test cases for validation
        test_cases = [
            {
                "name": "Missing Name Field",
                "data": {
                    "email": "test@example.com",
                    "subject": "Test Subject",
                    "message": "Test message content"
                },
                "expected_error": "name field missing"
            },
            {
                "name": "Invalid Email Format",
                "data": {
                    "name": "Test User",
                    "email": "invalid-email",
                    "subject": "Test Subject",
                    "message": "Test message content"
                },
                "expected_error": "invalid email format"
            },
            {
                "name": "Short Subject",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com",
                    "subject": "Hi",
                    "message": "Test message content"
                },
                "expected_error": "subject too short"
            },
            {
                "name": "Short Message",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com",
                    "subject": "Test Subject",
                    "message": "Short"
                },
                "expected_error": "message too short"
            },
            {
                "name": "Empty Request Body",
                "data": {},
                "expected_error": "missing required fields"
            }
        ]
        
        validation_passed = 0
        validation_failed = 0
        
        for test_case in test_cases:
            try:
                response = requests.post(f"{BASE_API_URL}/contact", 
                                       json=test_case["data"], 
                                       headers={"Content-Type": "application/json"},
                                       timeout=10)
                
                # Validation should return 422 (Unprocessable Entity) or 400 (Bad Request)
                if response.status_code in [400, 422]:
                    validation_passed += 1
                    print(f"   ✅ {test_case['name']}: Correctly rejected (HTTP {response.status_code})")
                else:
                    validation_failed += 1
                    print(f"   ❌ {test_case['name']}: Should have been rejected but got HTTP {response.status_code}")
                    
            except requests.exceptions.RequestException as e:
                validation_failed += 1
                print(f"   ❌ {test_case['name']}: Connection error: {str(e)}")
        
        if validation_failed == 0:
            self.log_test("Contact Form Validation", True, 
                        f"All {len(test_cases)} validation test cases passed")
        else:
            self.log_test("Contact Form Validation", False, 
                        f"{validation_failed}/{len(test_cases)} validation tests failed")
    
    def test_contacts_endpoint(self):
        """Test 5: Contacts endpoint GET /api/contacts"""
        try:
            response = requests.get(f"{BASE_API_URL}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "success" in data and "data" in data and data["success"]:
                    contacts = data["data"]
                    
                    if isinstance(contacts, list):
                        self.log_test("Contacts Endpoint", True, 
                                    f"Successfully retrieved {len(contacts)} contact submissions")
                        
                        # If we have contacts, validate structure of first one
                        if len(contacts) > 0:
                            first_contact = contacts[0]
                            required_fields = ["name", "email", "subject", "message", "timestamp"]
                            missing_fields = [field for field in required_fields if field not in first_contact]
                            
                            if missing_fields:
                                print(f"   ⚠️  Contact record missing fields: {missing_fields}")
                            else:
                                print(f"   ✅ Contact records have proper structure")
                    else:
                        self.log_test("Contacts Endpoint", False, 
                                    f"Expected array of contacts, got: {type(contacts)}")
                else:
                    self.log_test("Contacts Endpoint", False, 
                                f"Invalid response structure: {data}", data)
            else:
                self.log_test("Contacts Endpoint", False, 
                            f"HTTP {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contacts Endpoint", False, f"Connection error: {str(e)}")
    
    def test_json_responses(self):
        """Test 6: Verify all endpoints return proper JSON responses"""
        endpoints_to_test = [
            {"url": f"{BASE_API_URL}/", "method": "GET", "name": "Health Check"},
            {"url": f"{BASE_API_URL}/portfolio", "method": "GET", "name": "Portfolio"},
            {"url": f"{BASE_API_URL}/contacts", "method": "GET", "name": "Contacts"}
        ]
        
        json_tests_passed = 0
        json_tests_failed = 0
        
        for endpoint in endpoints_to_test:
            try:
                if endpoint["method"] == "GET":
                    response = requests.get(endpoint["url"], timeout=10)
                
                # Check if response is valid JSON
                try:
                    response.json()
                    json_tests_passed += 1
                    print(f"   ✅ {endpoint['name']}: Returns valid JSON")
                except json.JSONDecodeError:
                    json_tests_failed += 1
                    print(f"   ❌ {endpoint['name']}: Invalid JSON response")
                    
            except requests.exceptions.RequestException as e:
                json_tests_failed += 1
                print(f"   ❌ {endpoint['name']}: Connection error: {str(e)}")
        
        if json_tests_failed == 0:
            self.log_test("JSON Response Format", True, 
                        f"All {len(endpoints_to_test)} endpoints return valid JSON")
        else:
            self.log_test("JSON Response Format", False, 
                        f"{json_tests_failed}/{len(endpoints_to_test)} endpoints have JSON issues")
    
    def test_cors_headers(self):
        """Test 7: Verify CORS headers are present"""
        try:
            # Test with OPTIONS request to check CORS preflight
            response = requests.options(f"{BASE_API_URL}/portfolio", 
                                      headers={
                                          "Origin": "https://example.com",
                                          "Access-Control-Request-Method": "GET"
                                      },
                                      timeout=10)
            
            cors_headers_present = False
            cors_methods_allowed = False
            
            # Check for CORS headers
            if "Access-Control-Allow-Origin" in response.headers:
                cors_headers_present = True
                
            if "Access-Control-Allow-Methods" in response.headers:
                cors_methods_allowed = True
            
            # Also test with a regular GET request
            get_response = requests.get(f"{BASE_API_URL}/portfolio", 
                                      headers={"Origin": "https://example.com"},
                                      timeout=10)
            
            get_cors_headers = "Access-Control-Allow-Origin" in get_response.headers
            
            if cors_headers_present or get_cors_headers:
                self.log_test("CORS Configuration", True, 
                            "CORS headers are properly configured for frontend integration")
            else:
                self.log_test("CORS Configuration", False, 
                            "CORS headers missing - frontend integration may fail")
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"Connection error: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 80)
        print("PORTFOLIO BACKEND API TESTING SUITE")
        print("=" * 80)
        print()
        
        # Run all tests
        self.test_health_check()
        self.test_portfolio_data()
        self.test_contact_form_valid()
        self.test_contact_form_validation()
        self.test_contacts_endpoint()
        self.test_json_responses()
        self.test_cors_headers()
        
        # Print summary
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.passed_tests + self.failed_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests / (self.passed_tests + self.failed_tests) * 100):.1f}%")
        print()
        
        if self.failed_tests > 0:
            print("FAILED TESTS:")
            for result in self.test_results:
                if not result['passed']:
                    print(f"❌ {result['test']}: {result['message']}")
            print()
        
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("🎉 All backend API tests passed!")
        sys.exit(0)
    else:
        print("💥 Some backend API tests failed!")
        sys.exit(1)