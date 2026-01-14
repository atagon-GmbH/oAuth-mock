export const LANDING_PAGE_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OAuth2 Mock Server</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        turtel: '#24584D',
                        feijoa: '#A8DD73',
                        sea: '#4170E3',
                        pumkin: '#FF7F52',
                        pick: '#FCB6C5',
                        cream: '#D2B48C',
                        dark: '#0F172A',
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                    },
                    backgroundImage: {
                        'grid-pattern': "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
    </style>
</head>
<body class="bg-gray-50 text-slate-800 font-sans antialiased selection:bg-feijoa selection:text-turtel relative overflow-x-hidden">

    <!-- Background Decoration -->
    <div class="fixed inset-0 z-0 opacity-40 pointer-events-none" style="background-size: 40px 40px; background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);"></div>
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-feijoa/20 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-multiply"></div>
    <div class="fixed bottom-0 right-0 w-[600px] h-[600px] bg-sea/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-multiply"></div>

    <nav class="relative z-10 border-b border-gray-200/60 glass-panel sticky top-0">
        <div class="container mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-turtel rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-turtel/20">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <span class="font-bold text-turtel tracking-tight text-lg">MockAuth<span class="text-gray-400 font-normal">Server</span></span>
            </div>
           
        </div>
    </nav>

    <main class="container mx-auto px-6 py-16 relative z-10 max-w-6xl">
        
        <!-- Hero Section -->
        <div class="text-center mb-20">
                  
            <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Stop mocking oAuth <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-turtel via-sea to-turtel">the hard way.</span>
            </h1>
            
            <p class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                A zero-friction, drop-in replacement for OAuth2 providers. 
                Simulate Google, Microsoft, and GitHub without API keys.
            </p>

            <!-- Main URL Copy Component -->
            <div class="relative group max-w-2xl mx-auto">
                <div class="absolute -inset-1 bg-gradient-to-r from-feijoa to-sea rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div class="relative bg-white p-2 rounded-xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-2 ring-1 ring-gray-900/5">
                    <div class="flex-1 w-full bg-slate-50 py-4 px-6 rounded-lg text-left border border-gray-100 flex items-center justify-between group-hover:bg-slate-50/80 transition-colors">
                        <code class="text-turtel font-mono text-lg font-bold select-all">https://oauth.kogiqa.com/</code>
                    </div>
                    <div class="px-4 py-2 md:py-0">
                        <span class="text-xs font-bold text-sea uppercase tracking-wider bg-sea/10 px-3 py-1.5 rounded-md">Public Free URL</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Bento Grid -->
        <div class="grid md:grid-cols-3 gap-6 mb-24">
            <!-- Card 1 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="w-12 h-12 bg-sea/10 rounded-xl flex items-center justify-center mb-6 text-sea">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="font-bold text-xl text-slate-900 mb-3">Instant Usage</h3>
                <p class="text-slate-500 leading-relaxed">No npm install. No config files. Just swap the base URL in your .env file and start testing authentication flows immediately.</p>
            </div>

            <!-- Card 2 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div class="w-12 h-12 bg-pumkin/10 rounded-xl flex items-center justify-center mb-6 text-pumkin relative z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 class="font-bold text-xl text-slate-900 mb-3 relative z-10">Multi-Persona</h3>
                <p class="text-slate-500 leading-relaxed relative z-10">Intelligent routing automatically mimics specific provider behaviors (Google, GitHub, MS) based on the URL path.</p>
            </div>

            <!-- Card 3 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div class="w-12 h-12 bg-feijoa/30 rounded-xl flex items-center justify-center mb-6 text-turtel">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="font-bold text-xl text-slate-900 mb-3">OIDC Compliant</h3>
                <p class="text-slate-500 leading-relaxed">We don't just mock the happy path. Full support for <code>.well-known</code> discovery, JWKS signing, and standard auth code exchanges.</p>
            </div>
        </div>

        <!-- Documentation & Data Section -->
        <div class="w-full" id="guide">
            
            <h2 class="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <span>Supported Providers</span>
                <div class="h-px bg-gray-200 flex-1"></div>
            </h2>
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th class="px-6 py-4 font-semibold tracking-wider">Provider</th>
                                <th class="px-6 py-4 font-semibold tracking-wider">Auth Path</th>
                                <th class="px-6 py-4 font-semibold tracking-wider">Token Path</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-slate-600 font-mono">
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">Google</td>
                                <td class="px-6 py-4 text-xs">/o/oauth2/v2/auth</td>
                                <td class="px-6 py-4 text-xs">/oauth2/v4/token</td>
                            </tr>
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">Microsoft</td>
                                <td class="px-6 py-4 text-xs">/common/oauth2/v2.0/authorize</td>
                                <td class="px-6 py-4 text-xs">/common/oauth2/v2.0/token</td>
                            </tr>
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">GitHub</td>
                                <td class="px-6 py-4 text-xs">/login/oauth/authorize</td>
                                <td class="px-6 py-4 text-xs">/login/oauth/access_token</td>
                            </tr>
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">Facebook</td>
                                <td class="px-6 py-4 text-xs">/v12.0/dialog/oauth</td>
                                <td class="px-6 py-4 text-xs">/v12.0/oauth/access_token</td>
                            </tr>
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">Discord</td>
                                <td class="px-6 py-4 text-xs">/api/oauth2/authorize</td>
                                <td class="px-6 py-4 text-xs">/api/oauth2/token</td>
                            </tr>
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">Slack</td>
                                <td class="px-6 py-4 text-xs">/openid/connect/authorize</td>
                                <td class="px-6 py-4 text-xs">/api/openid.connect.token</td>
                            </tr>
                            <tr class="hover:bg-feijoa/5 transition-colors group">
                                <td class="px-6 py-4 font-sans font-bold text-slate-800 group-hover:text-turtel">Apple/Generic</td>
                                <td class="px-6 py-4 text-xs">/auth/authorize</td>
                                <td class="px-6 py-4 text-xs">/auth/token</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Dynamic Injection Tip (Documentation Style) -->
            <div class="mt-8 border-l-4 border-turtel bg-white shadow-sm border-y border-r border-gray-200 p-6 rounded-r-lg">
                <div class="flex flex-col gap-4">
                    <div>
                        <h3 class="font-bold text-slate-900 text-lg">Pro Tip: Inject User Data</h3>
                        <p class="text-slate-600 mt-1 max-w-3xl">
                            You don't need to rely on random data for testing. Pass specific user details directly via URL query parameters to force a specific user profile.
                        </p>
                    </div>
                    <div class="bg-slate-900 rounded p-4 font-mono text-sm text-slate-300 overflow-x-auto">
                        <span class="opacity-50">.../authorize?...&</span><span class="text-feijoa">name=QA_User</span><span class="opacity-50">&</span><span class="text-feijoa">email=qa@test.com</span>
                    </div>
                </div>
            </div>

        </div>
    </main>

    <footer class="border-t border-gray-200 mt-24 bg-white relative z-10">
        <div class="container mx-auto px-6 py-12">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                <a href="https://github.com/atagon-GmbH/oAuth-mock" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 group">
                    <div class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-500 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-200">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
                    </div>
                    <p class="text-sm text-gray-500 font-medium group-hover:text-slate-900 transition-colors duration-200">
                        Open Source &bull; MIT License
                    </p>
                </a>
                
                <div class="flex items-center gap-4">
                    <span class="text-xs text-gray-400 font-semibold uppercase tracking-widest">Sponsored By</span>
                    <a href="https://kogiQA.com" target="_blank" rel="noopener noreferrer" class="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                        <div class="flex items-center gap-1 font-bold text-slate-700 h-9">
                          <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="100%" height="100%" viewBox="0 0 1506 422" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Artboard1" transform="matrix(1.12849,0,0,0.561478,0,0)">
        <rect x="0" y="0" width="1334" height="750" style="fill:none;"/>
        <g transform="matrix(2.97231,0,0,3.95343,-858.359,-961.701)">
            <path d="M438.664,343.904L438.664,290L424.651,290L424.651,388.719L438.664,388.719L438.664,361.383L452.853,388.719L472.701,388.719L452.493,351.567L472.832,312.145L455.087,312.145L438.664,343.904Z" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(3.14651,0,0,3.53175,-876.358,-796.086)">
            <rect x="577.797" y="314.847" width="13.246" height="73.872" style="fill:rgb(36,88,77);"/>
        </g>
        <g transform="matrix(1.83201,0,0,3.68208,1227.24,531.107)">
            <path d="M0,-27.676C-2.549,-27.441 -5.178,-26.602 -7.014,-24.742C-9.213,-22.603 -10.286,-19.562 -10.618,-16.566C-10.988,-12.861 -10.651,-8.921 -8.781,-5.628C-7.33,-2.949 -4.557,-1.126 -1.588,-0.579C1.253,0.127 4.307,-0.255 6.921,-1.556C9.757,-2.996 11.774,-5.673 12.91,-8.594C13.866,-11.432 14.091,-14.531 13.467,-17.465C12.766,-21.012 10.604,-24.325 7.445,-26.153C5.232,-27.513 2.559,-27.926 0,-27.676M-8.733,-38.891C-5.556,-39.929 -2.17,-40.114 1.15,-39.992C4.721,-39.792 8.394,-38.908 11.274,-36.697C12.261,-35.987 13.09,-35.089 13.869,-34.162C13.781,-35.623 13.839,-37.086 13.824,-38.546L27.618,-38.546C27.615,-22.193 27.62,-5.838 27.615,10.515C23.012,10.515 18.41,10.506 13.807,10.521C13.858,9.015 13.774,7.507 13.869,6.004C11.887,8.476 9.135,10.321 6.066,11.135C1.233,12.438 -3.952,12.231 -8.743,10.843C-13.552,9.332 -17.809,6.116 -20.553,1.885C-23.359,-2.215 -24.592,-7.188 -24.896,-12.094C-25.116,-16.808 -24.572,-21.626 -22.75,-26.008C-20.271,-32.077 -15.06,-37.033 -8.733,-38.891" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(3.00429,0,0,6.03819,816.268,501.528)">
            <path d="M0,-27.094C-1.745,-26.947 -3.465,-26.475 -5.023,-25.676C-6.312,-24.937 -7.388,-23.868 -8.294,-22.702C-10.057,-20.168 -10.661,-17.03 -10.743,-13.996C-10.811,-10.683 -10.238,-7.236 -8.396,-4.422C-6.976,-2.157 -4.554,-0.642 -1.962,-0.082C1.291,0.774 4.818,0.347 7.853,-1.069C10.626,-2.479 12.358,-5.343 13.175,-8.261C14.091,-11.897 14.036,-15.784 12.978,-19.384C12.148,-22.078 10.318,-24.522 7.772,-25.798C5.4,-27.054 2.634,-27.286 0,-27.094M-3.094,-39.148C1.219,-39.682 5.64,-39.545 9.85,-38.419C10.519,-38.232 11.19,-37.984 11.899,-38.019C17.267,-38.042 22.635,-37.999 28.005,-38.042C27.993,-35.408 27.995,-32.774 28.005,-30.14C26.383,-30.025 24.782,-29.708 23.159,-29.64C25.801,-26.04 27.278,-21.694 27.783,-17.28C28.399,-11.864 27.788,-6.214 25.389,-1.271C23.703,2.362 21.047,5.525 17.751,7.8C13.05,11.218 7.165,12.588 1.423,12.581C-2.958,12.513 -7.425,11.784 -11.362,9.784C-14.501,8.197 -17.39,6.014 -19.552,3.223C-22.537,-0.552 -24.235,-5.238 -24.776,-9.994C-25.276,-14.531 -24.856,-19.199 -23.286,-23.501C-21.865,-27.344 -19.549,-30.919 -16.348,-33.515C-12.62,-36.671 -7.907,-38.513 -3.094,-39.148" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(1.81723,4.47289e-16,2.24356e-16,-3.68208,1112.13,430.758)">
            <path d="M0,-27.094C-1.745,-26.947 -3.465,-26.475 -5.023,-25.676C-6.312,-24.937 -7.388,-23.868 -8.294,-22.702C-10.057,-20.168 -10.661,-17.03 -10.743,-13.996C-10.811,-10.683 -10.238,-7.236 -8.396,-4.422C-6.976,-2.157 -4.554,-0.642 -1.962,-0.082C1.291,0.774 4.818,0.347 7.853,-1.069C10.626,-2.479 12.358,-5.343 13.175,-8.261C14.091,-11.897 14.036,-15.784 12.978,-19.384C12.148,-22.078 10.318,-24.522 7.772,-25.798C5.4,-27.054 2.634,-27.286 0,-27.094M-3.094,-39.148C1.219,-39.682 5.64,-39.545 9.85,-38.419C10.519,-38.232 11.19,-37.984 11.899,-38.019C17.267,-38.042 22.635,-37.999 28.005,-38.042C27.993,-35.408 28.005,-30.14 28.005,-30.14C28.005,-30.14 24.782,-29.708 23.159,-29.64C25.801,-26.04 27.278,-21.694 27.783,-17.28C28.399,-11.864 27.788,-6.214 25.389,-1.271C23.703,2.362 21.047,5.525 17.751,7.8C13.05,11.218 7.165,12.588 1.423,12.581C-2.958,12.513 -7.425,11.784 -11.362,9.784C-14.501,8.197 -17.39,6.014 -19.552,3.223C-22.537,-0.552 -24.235,-5.238 -24.776,-9.994C-25.276,-14.531 -24.856,-19.199 -23.286,-23.501C-21.865,-27.344 -19.549,-30.919 -16.348,-33.515C-12.62,-36.671 -7.907,-38.513 -3.094,-39.148" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(3.00429,0,0,6.03819,635.821,501.802)">
            <path d="M0,-27.091C-1.867,-26.931 -3.723,-26.412 -5.34,-25.453C-7.542,-24.122 -9.067,-21.888 -9.866,-19.473C-10.848,-16.472 -10.947,-13.235 -10.506,-10.126C-9.991,-6.865 -8.526,-3.53 -5.683,-1.665C-2.13,0.615 2.502,0.902 6.441,-0.479C8.382,-1.133 10.137,-2.394 11.277,-4.104C13.654,-7.37 14.023,-11.616 13.754,-15.524C13.462,-19.019 12.196,-22.734 9.255,-24.874C6.634,-26.863 3.206,-27.365 0,-27.091M-2.194,-39.25C4.679,-39.954 11.989,-38.815 17.759,-34.823C20.725,-32.738 23.209,-29.96 24.941,-26.774C27.978,-20.852 28.727,-13.893 27.429,-7.397C26.717,-4.139 25.554,-0.938 23.688,1.843C22.308,3.665 20.83,5.448 19.035,6.879C16.141,9.203 12.718,10.868 9.103,11.705C4.449,12.796 -0.439,12.863 -5.118,11.897C-8.658,11.203 -12.046,9.73 -14.962,7.608C-19.066,4.642 -22.133,0.323 -23.618,-4.518C-25.193,-9.826 -25.341,-15.551 -24.056,-20.934C-23.239,-24.482 -21.521,-27.78 -19.279,-30.629C-15.05,-35.667 -8.698,-38.66 -2.194,-39.25" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(0.779319,0,0,1.56633,961.01,250.396)">
            <path d="M-2.194,-39.25C4.679,-39.954 11.989,-38.815 17.759,-34.823C20.725,-32.738 23.209,-29.96 24.941,-26.774C27.978,-20.852 28.727,-13.893 27.429,-7.397C26.717,-4.139 25.554,-0.938 23.688,1.843C22.308,3.665 20.83,5.448 19.035,6.879C16.141,9.203 12.718,10.868 9.103,11.705C4.449,12.796 -0.439,12.863 -5.118,11.897C-8.658,11.203 -12.046,9.73 -14.962,7.608C-19.066,4.642 -22.133,0.323 -23.618,-4.518C-25.193,-9.826 -25.341,-15.551 -24.056,-20.934C-23.239,-24.482 -21.521,-27.78 -19.279,-30.629C-15.05,-35.667 -8.698,-38.66 -2.194,-39.25" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(0.52287,0,0,1.0509,1027.87,565.657)">
            <path d="M-2.194,-39.25C4.679,-39.954 11.989,-38.815 17.759,-34.823C20.725,-32.738 23.209,-29.96 24.941,-26.774C27.978,-20.852 28.727,-13.893 27.429,-7.397C26.717,-4.139 25.554,-0.938 23.688,1.843C22.308,3.665 20.83,5.448 19.035,6.879C16.141,9.203 12.718,10.868 9.103,11.705C4.449,12.796 -0.439,12.863 -5.118,11.897C-8.658,11.203 -12.046,9.73 -14.962,7.608C-19.066,4.642 -22.133,0.323 -23.618,-4.518C-25.193,-9.826 -25.341,-15.551 -24.056,-20.934C-23.239,-24.482 -21.521,-27.78 -19.279,-30.629C-15.05,-35.667 -8.698,-38.66 -2.194,-39.25" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(3.00429,0,0,6.03819,741.106,726.707)">
            <path d="M0,-22.782C4.775,-22.74 9.552,-22.764 14.33,-22.769C14.229,-19.581 15.871,-16.415 18.572,-14.71C21.406,-12.696 25.049,-12.286 28.427,-12.595C30.616,-12.708 32.729,-13.51 34.571,-14.668C37.247,-16.426 38.942,-19.551 38.912,-22.762C43.656,-22.762 48.399,-22.76 53.144,-22.762C53.108,-18.47 52.143,-14.094 49.796,-10.453C47.352,-6.626 43.514,-3.817 39.287,-2.242C34.471,-0.477 29.275,0 24.178,-0.217C19.204,-0.542 14.123,-1.54 9.839,-4.214C7.21,-5.737 4.995,-7.932 3.35,-10.478C1.003,-14.123 0.082,-18.495 0,-22.782" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(1.39438,0,0,2.80251,257.773,404.657)">
            <path d="M0,-21.44C-4.171,-32.91 -11.5,-48.18 -27.04,-57.39C-15.32,-75.79 3.329,-96.61 18.649,-96.62C19.14,-96.62 19.62,-96.6 20.09,-96.55C25.14,-96.11 26.319,-88.87 26.409,-82.87C26.78,-61.23 13.46,-30.67 0,-21.44M-137.89,-96.62C-122.57,-96.62 -103.921,-75.79 -92.2,-57.39C-107.74,-48.18 -115.07,-32.91 -119.24,-21.44C-132.7,-30.67 -146.021,-61.23 -145.65,-82.87C-145.55,-88.87 -144.38,-96.11 -139.33,-96.55C-138.86,-96.6 -138.38,-96.62 -137.89,-96.62M21.22,-109.5C20.38,-109.58 19.52,-109.62 18.659,-109.62C-7.44,-109.62 -31.41,-74.93 -39.07,-62.66C-45.25,-64.54 -52.16,-65.51 -59.61,-65.54C-67.08,-65.51 -73.99,-64.54 -80.171,-62.66C-87.82,-74.93 -111.79,-109.61 -137.9,-109.62C-138.761,-109.62 -139.62,-109.58 -140.47,-109.5C-145.8,-109.04 -158.271,-105.53 -158.65,-83.09C-158.86,-70.39 -155.101,-54.28 -148.61,-39.98C-141.69,-24.74 -132.73,-13.7 -123.261,-8.73C-123.64,-7.4 -124,-6.1 -124.351,-4.85C-125.44,-0.93 -126.38,2.46 -127.341,5.06C-134.28,23.64 -124.78,38.78 -121.83,42.84L-130.38,80.23C-130.771,81.92 -130.48,83.66 -129.55,85.13C-128.63,86.6 -127.19,87.62 -125.5,88.01C-125.05,88.12 -124.55,88.18 -124.04,88.18C-120.99,88.18 -118.39,86.1 -117.71,83.13L-111.25,54.89L-91.79,76.72C-90.561,78.11 -88.79,78.9 -86.931,78.9C-85.341,78.9 -83.8,78.31 -82.61,77.25C-79.94,74.87 -79.7,70.75 -82.08,68.08L-108.21,38.77L-110.931,35.72C-111.47,35.04 -113.23,32.7 -114.71,29.12C-116.55,24.61 -118.13,17.56 -115.171,9.59C-114.03,6.56 -113.07,3.13 -111.83,-1.38C-111.29,-3.31 -110.73,-5.32 -110.14,-7.35C-109.41,-9.9 -108.681,-12.23 -107.921,-14.46C-101.99,-32.1 -91.14,-52.38 -59.61,-52.54C-28.101,-52.38 -17.25,-32.1 -11.32,-14.46C-10.561,-12.25 -9.841,-9.92 -9.101,-7.35C-8.511,-5.32 -7.95,-3.31 -7.41,-1.38C-6.171,3.14 -5.2,6.58 -4.07,9.6C-1.11,17.56 -2.69,24.61 -4.53,29.12C-6.011,32.7 -7.771,35.05 -8.311,35.72L-11.03,38.77L-37.15,68.07C-39.53,70.75 -39.29,74.87 -36.63,77.25C-35.431,78.31 -33.9,78.9 -32.311,78.9C-30.45,78.9 -28.681,78.11 -27.45,76.72L-7.99,54.89L-1.53,83.13C-0.851,86.1 1.76,88.18 4.8,88.18C5.31,88.18 5.81,88.12 6.28,88.01C7.95,87.62 9.39,86.6 10.319,85.13C11.239,83.66 11.54,81.92 11.149,80.22L2.59,42.84C5.54,38.78 15.04,23.64 8.1,5.06C7.14,2.47 6.2,-0.92 5.11,-4.84C4.76,-6.1 4.399,-7.4 4.02,-8.73C13.489,-13.7 22.46,-24.74 29.38,-39.98C35.87,-54.28 39.62,-70.4 39.409,-83.09C39.03,-105.53 26.569,-109.04 21.22,-109.5" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(0,-2.80251,-1.39438,0,138.748,349.839)">
            <path d="M-7.231,-7.231C-11.221,-7.231 -14.461,-3.991 -14.461,-0C-14.461,3.999 -11.221,7.231 -7.231,7.231C-3.241,7.231 -0,3.999 -0,-0C-0,-3.991 -3.241,-7.231 -7.231,-7.231" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(0,-2.80251,-1.39438,0,210.538,349.854)">
            <path d="M-7.225,-7.225C-11.215,-7.225 -14.455,-3.996 -14.455,0.004C-14.455,3.995 -11.215,7.225 -7.225,7.225C-3.235,7.225 0.005,3.995 0.005,0.004C0.005,-3.996 -3.235,-7.225 -7.225,-7.225" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
        <g transform="matrix(1.39438,0,0,2.80251,212.12,421.36)">
            <path d="M0,38.15C-4.19,40.25 -8.181,41.3 -11.91,41.3C-14.86,41.3 -17.66,40.65 -20.29,39.35C-22.92,38.05 -25.09,36.22 -26.88,34.18C-28.67,36.22 -30.84,38.05 -33.47,39.35C-36.101,40.65 -38.899,41.3 -41.84,41.3C-45.58,41.3 -49.57,40.25 -53.76,38.15C-56.229,36.92 -57.229,33.92 -55.99,31.45C-55.12,29.69 -53.36,28.68 -51.53,28.68C-50.78,28.68 -50.01,28.85 -49.29,29.21C-46.521,30.6 -44.06,31.29 -41.88,31.29C-40.45,31.29 -39.14,30.99 -37.92,30.4C-34.29,28.61 -31.851,24.29 -30.42,20.67C-32.3,20.13 -45.54,15.9 -45.39,6.12C-45.26,-2.31 -33.47,-3.15 -28.78,-3.15C-27.61,-3.15 -26.88,-3.1 -26.88,-3.1L-26.87,-3.1C-26.87,-3.1 -26.149,-3.15 -24.979,-3.15C-20.28,-3.15 -8.49,-2.31 -8.37,6.12C-8.21,15.9 -21.46,20.13 -23.33,20.67C-21.91,24.29 -19.46,28.61 -15.83,30.4C-14.62,30.99 -13.31,31.29 -11.88,31.29C-9.7,31.29 -7.24,30.6 -4.46,29.21C-3.75,28.85 -2.979,28.68 -2.229,28.68C-0.399,28.68 1.36,29.69 2.229,31.45C3.47,33.92 2.47,36.92 0,38.15" style="fill:rgb(36,88,77);fill-rule:nonzero;"/>
        </g>
    </g>
</svg>

                        </div>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
`;